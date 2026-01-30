const path = require('path');
const fs = require('fs');
const Project = require('../models/Project');

async function listProjects(req, res, next) {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
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

module.exports = { listProjects, createProject, deleteProject };
