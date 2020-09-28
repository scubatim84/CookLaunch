import dotenv from 'dotenv';
import express from 'express';
import AWS from 'aws-sdk';
import fileType from 'file-type';
import fs from 'fs';
import multiparty from 'multiparty';

// Set up Express router
const router = express.Router();

// Set up environment variable support
dotenv.config();

// Configure the keys for accessing AWS
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create S3 instance for uploading images for app
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// Abstracts function to upload a file which returns a promise
const uploadFile = (buffer, fileName, type, folder) => {
  const fileType = type.mime.split('/')[0];

  if (fileType !== 'image') {
    throw new Error();
  }

  const uploadParams = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: folder + '/' + fileName,
  };

  return s3.upload(uploadParams).promise();
};

// @route POST files/:folder
// @desc Upload image
// @access Private
router.post('/:folder', (req, res) => {
  const form = new multiparty.Form();

  try {
    form.parse(req, async (error, fields, files) => {
      if (error) throw new Error(error);

      try {
        const fileName = files.file[0].originalFilename;
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await fileType.fromBuffer(buffer);
        const folder = req.params.folder;
        const data = await uploadFile(buffer, fileName, type, folder);

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

// @route DELETE files/:folder/:name
// @desc Delete image
// @access Private
router.delete('/:folder/:name', async (req, res) => {
  const deleteParams = {
    Bucket: process.env.S3_BUCKET,
    Key: req.params.folder + '/' + req.params.name,
  };

  try {
    s3.deleteObject(deleteParams, (err, data) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(204).send(null);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
