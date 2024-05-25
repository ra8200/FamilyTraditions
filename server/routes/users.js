const express = require('express');
const router = express.Router();
const { User } = require('../models');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

router.post('/', async (req, res) => {
  const { clerk_user_id, username, first_name, last_name, email, profileImage } = req.body;
  try {
    const uploadResponse = await cloudinary.uploader.upload(profileImage);
    const newUser = await User.create({
      clerk_user_id,
      username,
      first_name,
      last_name,
      email,
      profile_image_url: uploadResponse.url,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, first_name, last_name, email, profileImage } = req.body;
  try {
    let imageUrl;
    if (profileImage) {
      const uploadResponse = await cloudinary.uploader.upload(profileImage);
      imageUrl = uploadResponse.url;
    }
    const updatedUser = await User.update(
      { username, first_name, last_name, email, profile_image_url: imageUrl },
      { where: { user_id: id } }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send('Error updating user');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { user_id: id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
});

module.exports = router;