import express from 'express';
import { registerUser, loginUser } from '../services/userService.js';

const authRouter = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const token = await registerUser({ name, email, password });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser({ email, password });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default authRouter;
