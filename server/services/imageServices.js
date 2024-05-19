const cloudinary = require('../config/cloudinaryConfig');

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.url;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
};

module.exports = { uploadImage };