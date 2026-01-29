const express = require('express');
const { auth } = require('../middlewares/auth');
const { upload, processImage } = require('../middlewares/upload');
const { listProjects, createProject } = require('../controllers/projectController');

const router = express.Router();

router.get('/', listProjects);
router.post('/', auth, upload.single('image'), processImage, createProject);

module.exports = router;
