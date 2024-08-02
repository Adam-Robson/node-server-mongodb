import express from 'express';
import auth from '../middleware/auth.js';
import List from '../models/List.js';

const listRouter = express.Router();

// @route   POST /api/lists
// @desc    Create a new list
listRouter.post('/', auth, async (req, res) => {
  const { name } = req.body;

  try {
    const newList = new List({
      user: req.user.id,
      name
    });

    await newList.save();
    res.json(newList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/lists
// @desc    Get all lists
listRouter.get('/', auth, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id }).sort({ date: -1 });
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default listRouter;
