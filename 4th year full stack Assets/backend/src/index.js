require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const projectRoutes = require('./routes/projects');
const clientRoutes = require('./routes/clients');
const contactRoutes = require('./routes/contacts');
const subscriberRoutes = require('./routes/subscribers');
const authRoutes = require('./routes/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
// Support multiple origins (local dev, Vercel preview/prod) via ALLOWED_ORIGINS
// Example: ALLOWED_ORIGINS="http://localhost:5173,https://your-app.vercel.app,https://*.vercel.app"
const defaultAllowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',
  'https://*.vercel.app',
];
const allowedOrigins = (process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim())
  : defaultAllowedOrigins).filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g., curl/Postman) and same-origin
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((allowed) => {
        // Wildcard subdomain support: "*.vercel.app"
        if (allowed.startsWith('*.')) {
          const base = allowed.slice(2);
          return origin.endsWith(base);
        }
        return origin === allowed;
      });

      return isAllowed ? callback(null, true) : callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend is running 🚀',
    environment: process.env.NODE_ENV || 'development'
  });
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Error handler
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });
