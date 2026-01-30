require('dotenv').config();
const { connectDB } = require('../config/db');
const Project = require('../models/Project');

async function main() {
  await connectDB();
  // List of default images to assign (should exist in uploads)
  const defaultImages = [
    '/uploads/project1.svg',
    '/uploads/project2.svg',
    '/uploads/logo.svg',
    '/uploads/pexels-brett-sayles-2881232-1.svg',
  ];
  const projects = await Project.find({});
  let updated = 0;
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    if (!project.image) {
      // Assign a default image in round-robin fashion
      project.image = defaultImages[i % defaultImages.length];
      await project.save();
      updated++;
      console.log(`Updated project ${project.name} with image ${project.image}`);
    }
  }
  console.log(`Update complete. ${updated} projects updated.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
