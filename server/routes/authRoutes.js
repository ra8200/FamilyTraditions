const express = require('express');
const router = express.Router();
// const { requireAuth } = require('@clerk/clerk-sdk-node');

// Middleware to verify Clerk token
// router.use(requireAuth());

// Issue Clerk token for authenticated user
router.post('/issue-token', async (req, res) => {
  try {
    const { userId } = req.auth;
    const result = await pool.query('SELECT * FROM users WHERE clerk_user_id = $1', [userId]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Authenticated', userId: user.user_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;