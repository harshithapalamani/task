const express = require('express');
const { auth, requireAdmin } = require('../middlewares/auth');
const { upload, processImage } = require('../middlewares/upload');
const { listProjects, createProject, deleteProject } = require('../controllers/projectController');

const router = express.Router();

router.get('/', listProjects);
router.post('/', auth, upload.single('image'), processImage, createProject);
router.delete('/:id', auth, requireAdmin, deleteProject);

module.exports = router;
