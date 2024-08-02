import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
