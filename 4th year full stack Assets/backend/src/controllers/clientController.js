const Client = require('../models/Client');

async function listClients(req, res, next) {
  try {
    const items = await Client.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function createClient(req, res, next) {
  try {
    const { name, designation, description } = req.body;
    if (!name || !designation || !description || !req.processedImagePath) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const created = await Client.create({ name, designation, description, image: req.processedImagePath });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

module.exports = { listClients, createClient };
