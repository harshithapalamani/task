const Subscriber = require('../models/Subscriber');

async function listSubscribers(req, res, next) {
  try {
    const items = await Subscriber.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function createSubscriber(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const exists = await Subscriber.findOne({ email });
    if (exists) return res.status(200).json({ message: 'Already subscribed' });
    const created = await Subscriber.create({ email });
    res.status(201).json({ message: 'Subscribed', data: created });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ message: 'Already subscribed' });
    }
    next(err);
  }
}

module.exports = { listSubscribers, createSubscriber };
