const path = require('path');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');

const upload = multer({ storage: multer.memoryStorage() });

async function processImage(req, res, next) {
  try {
    if (!req.file) return next();
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
    const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
    const filepath = path.join(uploadsDir, filename);

    // Enforce 450x350 with cover fit (crop to ratio)
    await sharp(req.file.buffer)
      .resize(450, 350, { fit: 'cover' })
      .toFile(filepath);

    // Public URL path for static serving
    req.processedImagePath = `/uploads/${filename}`;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { upload, processImage };
