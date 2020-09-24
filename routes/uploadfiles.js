import dotenv from 'dotenv';
import express from 'express';
import AWS from 'aws-sdk';
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
const uploadFile = (buffer, fileName) => {
  const uploadParams = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
  };

  return s3.upload(uploadParams).promise();
};

// @route POST uploadfiles/recipeimage
// @desc Upload recipe image
// @access Private
router.post('/recipeimage', (request, response) => {
  const form = new multiparty.Form();

  try {
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);

      try {
        const fileName = files.file[0].originalFilename;
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const data = await uploadFile(buffer, fileName);

        return response.status(200).json(data);
      } catch (error) {
        return response.status(400).json(error);
      }
    });
  } catch (err) {
    return response.status(400).json(error);
  }
});

export default router;
