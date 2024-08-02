const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /users
// @desc    Add a new user
router.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({
      name,
      email,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
