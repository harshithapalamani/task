const express = require('express');
const { auth } = require('../middlewares/auth');
const { listContacts, createContact, exportContacts } = require('../controllers/contactController');

const router = express.Router();

router.get('/', auth, listContacts);
router.get('/export', auth, exportContacts);
router.post('/', createContact);

module.exports = router;
