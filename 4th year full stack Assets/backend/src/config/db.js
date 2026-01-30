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
  const conn = mongoose.connection;
  const mask = (s) => {
    try {
      // hide credentials between // and @
      return String(s).replace(/(mongodb(?:\+srv)?:\/\/)([^@]+)@/i, (_, p1) => p1 + '***@');
    } catch {
      return '***';
    }
  };
  console.log('MongoDB connected', {
    dbName: conn?.name,
    host: conn?.host,
    uri: mask(process.env.MONGODB_URI),
  });
}

module.exports = { connectDB };
