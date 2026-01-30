const express = require('express');
const mongoose = require('mongoose');
const { auth, requireAdmin } = require('../middlewares/auth');

const router = express.Router();

router.get('/info', auth, requireAdmin, (req, res) => {
  const conn = mongoose.connection;
  res.json({
    dbName: conn?.name,
    host: conn?.host,
    collections: Object.keys(conn?.collections || {}),
    clientUrl: process.env.CLIENT_URL || null,
    allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
  });
});

module.exports = router;