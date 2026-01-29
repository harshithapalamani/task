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
const defaultAllowedOrigins = [CLIENT_URL, 'http://localhost:5173', '*.vercel.app'];
const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
// Merge env + defaults, de-duplicate
const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envAllowedOrigins]));
console.log('CORS allowed origins:', allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g., curl/Postman) and same-origin
      if (!origin) return callback(null, true);

      let hostname;
      try {
        hostname = new URL(origin).hostname;
      } catch {
        hostname = origin;
      }
      console.log('CORS check origin:', origin, 'hostname:', hostname);

      const isAllowed = allowedOrigins.some((allowed) => {
        if (!allowed) return false;
        // Strip scheme if present
        const normalized = allowed.replace(/^[a-z]+:\/\//i, '');
        // Wildcard subdomain support: "*.example.com" or "https://*.example.com"
        if (normalized.startsWith('*.')) {
          const base = normalized.slice(2);
          return hostname.endsWith(base) && hostname !== base;
        }
        // Exact hostname match
        if (hostname === normalized) return true;
        // Fallback to exact origin string match
        return origin === allowed;
      });

      if (isAllowed) {
        return callback(null, true);
      }
      console.warn('CORS denied for origin:', origin, 'allowed:', allowedOrigins);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    optionsSuccessStatus: 204,
  })
);
// Ensure preflight requests are handled for all routes
app.options('*', cors());
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
