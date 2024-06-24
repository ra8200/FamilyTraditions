const express = require('express');
const router = express.Router();
const pool = require('../config/config');
const cloudinary = require('cloudinary').v2;
// const { requireAuth } = require('@clerk/clerk-sdk-node'); // Commented out for testing

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { clerk_user_id, username, first_name, last_name, email, profile_image_url } = req.body;

    // Generating a Cloudinary signature
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, process.env.CLOUDINARY_API_SECRET);

    const result = await pool.query(
      'INSERT INTO users (clerk_user_id, username, first_name, last_name, email, profile_image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [clerk_user_id, username, first_name, last_name, email, profile_image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { clerk_user_id, username, first_name, last_name, email, profileImage } = req.body;
  try {
    const uploadResponse = await cloudinary.uploader.upload(profileImage);
    const result = await pool.query(
      'INSERT INTO users (clerk_user_id, username, first_name, last_name, email, profile_image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [clerk_user_id, username, first_name, last_name, email, uploadResponse.url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, first_name, last_name, email, profileImage } = req.body;
  try {
    let imageUrl;
    if (profileImage) {
      const uploadResponse = await cloudinary.uploader.upload(profileImage);
      imageUrl = uploadResponse.url;
    }
    const result = await pool.query(
      'UPDATE users SET username = $1, first_name = $2, last_name = $3, email = $4, profile_image_url = $5 WHERE user_id = $6 RETURNING *',
      [username, first_name, last_name, email, imageUrl, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
