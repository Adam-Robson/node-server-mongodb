import express from 'express';
import authentication from '../middleware/authentication.js';
import Item from '../models/Item.js';

const itemsRouter = express.Router();

// @route   POST /api/items
// @desc    Create a new item
itemsRouter.post('/', authentication, async (req, res) => {
  const { list, name } = req.body;

  try {
    const newItem = new Item({
      user: req.user.id,
      list,
      name
    });

    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/items
// @desc    Get all items
itemsRouter.get('/', authentication, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default itemsRouter;
