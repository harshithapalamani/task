const path = require('path');
const fs = require('fs');
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

async function deleteClient(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Client.findById(id);
    if (!item) return res.status(404).json({ error: 'Client not found' });

    // Attempt to delete associated image file
    if (item.image) {
      try {
        const filename = path.basename(item.image);
        const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (_) {
        // ignore file deletion errors
      }
    }

    await Client.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listClients, createClient, deleteClient };
