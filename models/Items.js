const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: String,
  image: String,
  contact: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Item', itemSchema);

