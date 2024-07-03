const express = require('express');
const router = express.Router();
const pool = require('../config/config');
const multer = require('multer');
const { uploadImage, deleteImage } = require('../services/imageServices');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { clerk_user_id, username, first_name, last_name, email, profileImage } = req.body;

    let profile_image_url = '';
    if (profileImage) {
      const uploadResponse = await cloudinary.uploader.upload(profileImage);
      profile_image_url = uploadResponse.url;
    }

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
    const result = await pool.query('SELECT profile_image_url FROM users WHERE user_id = $1', [id]);

    if (result.rows.length > 0) {
      const cloudinaryUrl = result.rows[0].profile_image_url;
      await deleteImageFromCloudinary(cloudinaryUrl);

      await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).send('Error deleting user');
  }
});

module.exports = router;