const express = require('express');
const { auth, requireAdmin } = require('../middlewares/auth');
const { upload, processImage } = require('../middlewares/upload');
const { listClients, createClient, deleteClient } = require('../controllers/clientController');

const router = express.Router();

router.get('/', listClients);
router.post('/', auth, upload.single('image'), processImage, createClient);
router.delete('/:id', auth, requireAdmin, deleteClient);

module.exports = router;
