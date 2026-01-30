const path = require('path');
const fs = require('fs');
const Project = require('../models/Project');

async function listProjects(req, res, next) {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    // Build full image URL for each project
    // Always use HTTPS for image URLs
    const host = req.get('host');
    const baseUrl = `https://${host}`;
    const mapped = items.map((p) => {
      let imgPath = p.image || '';
      // Remove any leading slashes and duplicate 'uploads/'
      imgPath = imgPath.replace(/^\/|^uploads[\/]+|^\/uploads[\/]+/, '');
      if (imgPath && !imgPath.startsWith('http')) {
        imgPath = `${baseUrl}/uploads/${imgPath}`;
      }
      return { ...p.toObject(), image: imgPath };
    });
    res.json(mapped);
  } catch (err) {
    next(err);
  }
}

async function createProject(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name || !description || !req.processedImagePath) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const created = await Project.create({ name, description, image: req.processedImagePath });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Project.findById(id);
    if (!item) return res.status(404).json({ error: 'Project not found' });

    if (item.image) {
      try {
        const filename = path.basename(item.image);
        const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (_) {
        // ignore file deletion errors
      }
    }

    await Project.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

function buildProjectFilterAndSort(query) {
  const q = (query.q || '').trim();
  const filter = {};
  if (q) {
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { name: rx },
      { description: rx },
    ];
  }

  const sortable = new Set(['createdAt', 'name']);
  const sortBy = sortable.has(query.sortBy) ? query.sortBy : 'createdAt';
  const sortDir = query.sortDir === 'asc' ? 1 : -1;
  const sort = { [sortBy]: sortDir };

  return { filter, sort };
}

async function exportProjects(req, res, next) {
  try {
    const { filter, sort } = buildProjectFilterAndSort(req.query);
    const items = await Project.find(filter).sort(sort).lean();

    const rows = [
      ['Name', 'Description', 'Image', 'Created At'],
      ...items.map((p) => [
        p.name || '',
        p.description || '',
        p.image || '',
        p.createdAt ? new Date(p.createdAt).toISOString() : '',
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
    const filename = `projects_export_${Date.now()}.csv`;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send('\uFEFF' + csv);
  } catch (err) {
    next(err);
  }
}

async function deleteAllProjects(req, res, next) {
  try {
    const items = await Project.find({}, { image: 1 }).lean();
    for (const it of items) {
      if (it.image) {
        try {
          const filename = path.basename(it.image);
          const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch (_) {}
      }
    }
    await Project.deleteMany({});
    res.json({ deleted: items.length });
  } catch (err) {
    next(err);
  }
}

module.exports = { listProjects, createProject, deleteProject, exportProjects, deleteAllProjects };
