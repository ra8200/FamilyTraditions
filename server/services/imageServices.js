const cloudinary = require('../config/cloudinaryConfig');

const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });
    stream.end(buffer);
  });
};

module.exports = { uploadImage };