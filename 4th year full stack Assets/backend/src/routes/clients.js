const express = require('express');
const { auth, requireAdmin } = require('../middlewares/auth');
const { upload, processImage } = require('../middlewares/upload');
const { listClients, createClient, deleteClient, exportClients, deleteAllClients } = require('../controllers/clientController');

const router = express.Router();

router.get('/', listClients);
router.post('/', auth, upload.single('image'), processImage, createClient);
router.delete('/:id', auth, requireAdmin, deleteClient);
router.get('/export', auth, requireAdmin, exportClients);
router.delete('/', auth, requireAdmin, deleteAllClients);

module.exports = router;
