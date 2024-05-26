const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { requireAuth } = require('@clerk/clerk-sdk-node');

// Middleware to verify Clerk token
router.use(requireAuth());

// Issue Clerk token for authenticated user
router.post('/issue-token', async (req, res) => {
  try {
    const { userId } = req.auth;
    const user = await User.findOne({ where: { clerk_user_id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Authenticated', userId: user.user_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
