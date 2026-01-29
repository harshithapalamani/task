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

module.exports = { listProjects, createProject };
