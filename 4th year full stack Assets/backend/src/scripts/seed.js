require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { connectDB } = require('../config/db');
const Project = require('../models/Project');
const Client = require('../models/Client');

async function ensureUploadsFiles() {
  const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  // Try copying a few SVGs from the frontend public images as placeholders
  const frontendImagesDir = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'images');
  const filesToCopy = [
    { src: 'hero.svg', dest: 'project1.svg' },
    { src: 'pexels-brett-sayles-2881232-1.svg', dest: 'project2.svg' },
    { src: 'pexels-fauxels-3182834.svg', dest: 'client1.svg' },
    { src: 'logo.svg', dest: 'client2.svg' },
  ];

  for (const { src, dest } of filesToCopy) {
    const srcPath = path.join(frontendImagesDir, src);
    const destPath = path.join(uploadsDir, dest);
    try {
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${src} -> uploads/${dest}`);
      }
    } catch (e) {
      console.warn(`Could not copy ${src}:`, e.message);
    }
  }
}

async function main() {
  await connectDB();
  await ensureUploadsFiles();

  const projects = [
    { name: 'Modern Duplex', description: 'Stylish duplex with premium finishes.', image: '/uploads/project1.svg' },
    { name: 'Urban Loft', description: 'Open-plan loft in city center.', image: '/uploads/project2.svg' },
  ];

  const clients = [
    { name: 'Alex Johnson', designation: 'Investor', description: 'Partnered on multiple developments.', image: '/uploads/client1.svg' },
    { name: 'Priya Sharma', designation: 'Homeowner', description: 'Renovation and interior design project.', image: '/uploads/client2.svg' },
  ];

  for (const p of projects) {
    await Project.updateOne({ name: p.name }, { $setOnInsert: p }, { upsert: true });
  }
  for (const c of clients) {
    await Client.updateOne({ name: c.name }, { $setOnInsert: c }, { upsert: true });
  }
  const projCount = await Project.countDocuments();
  const clientCount = await Client.countDocuments();
  console.log(`Seed complete. Projects: ${projCount}, Clients: ${clientCount}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
