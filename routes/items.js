const express = require('express');
const router = express.Router();
const Item = require('../models/items');


// Add new item
router.post('/', async (req, res) => {
  if (!req.session.user) return res.status(401).send('Not logged in');

  const { name, type, price, image, contact } = req.body;
  try {
    const item = await Item.create({
      name,
      type,
      price,
      image,
      contact,
      userId: req.session.user._id
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).send('Error adding item');
  }
});

// Get items for logged in user
router.get('/', async (req, res) => {
  if (!req.session.user) return res.status(401).send('Not logged in');

  const items = await Item.find({ userId: req.session.user._id });
  res.json(items);
});

// Clear all items for logged in user
router.delete('/clear', async (req, res) => {
  if (!req.session.user) return res.status(401).send('Not logged in');

  await Item.deleteMany({ userId: req.session.user._id });
  res.send('All items cleared');
});

module.exports = router;
