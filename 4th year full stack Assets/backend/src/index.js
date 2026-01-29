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
// Permissive preflight: always respond to OPTIONS with CORS headers
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin || '*';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    return res.sendStatus(204);
  }
  next();
});

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
// Support multiple origins (local dev, Vercel preview/prod) via ALLOWED_ORIGINS
// Example: ALLOWED_ORIGINS="http://localhost:5173,https://your-app.vercel.app"
const defaultAllowedOrigins = [CLIENT_URL, 'http://localhost:5173'];
const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
// Prefer env allowlist; fallback to defaults
const allowedOrigins = envAllowedOrigins.length ? envAllowedOrigins : defaultAllowedOrigins;
// Derive hostnames from allowed origins
const allowedHostnames = allowedOrigins.map((o) => {
  try { return new URL(o).hostname; } catch { return o; }
});
console.log('CORS allowed origins:', allowedOrigins);
console.log('CORS allowed hostnames:', allowedHostnames);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g., curl/Postman) and same-origin
      if (!origin) return callback(null, true);
      console.log('CORS Origin:', origin);

      let hostname;
      try { hostname = new URL(origin).hostname; } catch { hostname = origin; }

      const isAllowed =
        allowedOrigins.includes(origin) ||
        allowedHostnames.includes(hostname) ||
        hostname.endsWith('vercel.app'); // allow changing Vercel preview URLs for this project

      if (isAllowed) {
        return callback(null, true);
      }
      console.warn('CORS denied for origin:', origin, 'allowed:', allowedOrigins, 'hostnames:', allowedHostnames);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    optionsSuccessStatus: 204,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
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
