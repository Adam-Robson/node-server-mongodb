// services/userService.js

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async ({ name, email, password }) => {
  let user = await User.findOne({ email });

  if (user) {
    throw new Error('User already exists');
  }

  user = new User({
    name,
    email,
    password: await bcrypt.hash(password, 10)
  });

  await user.save();

  const payload = {
    user: {
      id: user.id
    }
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return token;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid Credentials');
  }

  const payload = {
    user: {
      id: user.id
    }
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return token;
};

export { registerUser, loginUser };
