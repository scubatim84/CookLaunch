import axios from 'axios';
import cookies from 'js-cookie';

export const addImage = async (folder, imageKey, formData) => {
  try {
    const token = cookies.get('user');
    return await axios.post(`/files/${folder}/${imageKey}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};

export const deleteImage = async (imageKey) => {
  const folder = imageKey.split('/')[0];
  const fileName = imageKey.split('/')[1];

  try {
    const token = cookies.get('user');
    return await axios.delete(`/files/${folder}/${fileName}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    return err.response.data;
  }
};
