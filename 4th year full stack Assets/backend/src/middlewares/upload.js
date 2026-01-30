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

    // Resize to 450x350. Default: 'contain' to avoid cropping.
    // Set IMAGE_FIT=cover in env to enable cropping behavior.
    const fitMode = (process.env.IMAGE_FIT || 'contain').toLowerCase() === 'cover' ? 'cover' : 'contain';
    await sharp(req.file.buffer)
      .resize(450, 350, { fit: fitMode, background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .toFile(filepath);

    // Public URL path for static serving
    req.processedImagePath = `/uploads/${filename}`;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { upload, processImage };
