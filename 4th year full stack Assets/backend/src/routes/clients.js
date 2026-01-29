const express = require('express');
const { auth } = require('../middlewares/auth');
const { upload, processImage } = require('../middlewares/upload');
const { listClients, createClient } = require('../controllers/clientController');

const router = express.Router();

router.get('/', listClients);
router.post('/', auth, upload.single('image'), processImage, createClient);

module.exports = router;
