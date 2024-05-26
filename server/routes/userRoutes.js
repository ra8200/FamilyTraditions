const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { requireAuth } = require('@clerk/clerk-sdk-node');

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

router.get('/', requireAuth(), async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;