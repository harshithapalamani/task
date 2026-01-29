const mongoose = require('mongoose');

async function connectDB() {
  let uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set in env');

  // Avoid IPv6 localhost (::1) issues on Windows by forcing 127.0.0.1
  if (uri.includes('localhost')) {
    uri = uri.replace('localhost', '127.0.0.1');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    autoIndex: true,
  });
  console.log('MongoDB connected');
}

module.exports = { connectDB };
