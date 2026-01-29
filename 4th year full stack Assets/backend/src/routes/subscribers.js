const express = require('express');
const { auth } = require('../middlewares/auth');
const { listSubscribers, createSubscriber } = require('../controllers/subscriberController');

const router = express.Router();

router.get('/', auth, listSubscribers);
router.post('/', createSubscriber);

module.exports = router;
