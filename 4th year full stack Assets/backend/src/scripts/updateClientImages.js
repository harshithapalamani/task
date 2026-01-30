require('dotenv').config();
const { connectDB } = require('../config/db');
const Client = require('../models/Client');

async function main() {
  await connectDB();
  // List of default images to assign (should exist in uploads)
  const defaultImages = [
    '/uploads/client1.svg',
    '/uploads/client2.svg',
    '/uploads/logo.svg',
    '/uploads/pexels-fauxels-3182834.svg',
  ];
  const clients = await Client.find({});
  let updated = 0;
  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    if (!client.image) {
      // Assign a default image in round-robin fashion
      client.image = defaultImages[i % defaultImages.length];
      await client.save();
      updated++;
      console.log(`Updated client ${client.name} with image ${client.image}`);
    }
  }
  console.log(`Update complete. ${updated} clients updated.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
