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

function buildClientFilterAndSort(query) {
  const q = (query.q || '').trim();
  const filter = {};
  if (q) {
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { name: rx },
      { designation: rx },
      { description: rx },
    ];
  }

  const sortable = new Set(['createdAt', 'name', 'designation']);
  const sortBy = sortable.has(query.sortBy) ? query.sortBy : 'createdAt';
  const sortDir = query.sortDir === 'asc' ? 1 : -1;
  const sort = { [sortBy]: sortDir };

  return { filter, sort };
}

async function exportClients(req, res, next) {
  try {
    const { filter, sort } = buildClientFilterAndSort(req.query);
    const items = await Client.find(filter).sort(sort).lean();

    const rows = [
      ['Name', 'Designation', 'Description', 'Image', 'Created At'],
      ...items.map((c) => [
        c.name || '',
        c.designation || '',
        c.description || '',
        c.image || '',
        c.createdAt ? new Date(c.createdAt).toISOString() : '',
      ]),
    ];

    const escapeCSV = (val) => {
      const s = String(val);
      if (/[",\n]/.test(s)) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };

    const csv = rows.map((r) => r.map(escapeCSV).join(',')).join('\n');
    const filename = `clients_export_${Date.now()}.csv`;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send('\uFEFF' + csv);
  } catch (err) {
    next(err);
  }
}

module.exports = { listClients, createClient, deleteClient, exportClients };
