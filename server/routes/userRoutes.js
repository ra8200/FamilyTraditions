const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { requireAuth } = require('@clerk/clerk-sdk-node');
const cloudinary = require('cloudinary').v2;

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { clerk_user_id, username, first_name, last_name, email, profile_image_url } = req.body;
    const newUser = await User.create({
      clerk_user_id,
      username,
      first_name,
      last_name,
      email,
      profile_image_url
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/', requireAuth(), async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID
router.get('/:id', requireAuth(), async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post('/', requireAuth(), async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put('/:id', requireAuth(), async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
router.delete('/:id', requireAuth(), async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { user_id: id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;