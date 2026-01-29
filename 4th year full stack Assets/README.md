# Lead Generation Assignment

Production-ready React + Vite + Tailwind frontend and Node.js + Express + MongoDB backend. Images are uploaded via Multer and processed to 450x350 with Sharp. All provided assets are integrated to match the reference design.

## Project Structure

- `frontend/` — React + Vite + Tailwind app
- `backend/` — Express API with MongoDB (Mongoose), image upload & processing
- Assets: see folders `Lead Generation Landing page (Images)`, `(Icons)`, `(shapes)` copied into `frontend/public/*`

## Getting Started (Windows)

1. Backend
   - Copy `backend/.env.example` to `backend/.env` and set values
   - Ensure MongoDB is running locally (or set a remote URI)
   - Install deps and start:

   ```powershell
   Push-Location "backend";
   npm install;
   npm run dev;
   Pop-Location
   ```

2. Frontend
   - Copy `frontend/.env.example` to `frontend/.env`
   - Install deps and start:

   ```powershell
   Push-Location "frontend";
   npm install;
   npm run dev;
   Pop-Location
   ```

Frontend dev server runs on `http://localhost:5173` (port may vary), backend on `http://localhost:5000`.

## Features

- Landing page:
  - Our Projects: fetched from API, shows image, name, description
  - Happy Clients: fetched from API, shows image, name, designation, description
  - Contact form: submits name, email, mobile, city
  - Newsletter: subscribes an email and avoids duplicates
  - Visual sections matching reference: Hero, Intro circles, Why Choose Us with icons, Gallery, Footer CTA
- Admin dashboard (simple auth via email/password in env):
  - Add Project (image upload, Sharp enforced 450x350 crop/resize)
  - Add Client (image upload)
  - View contacts
  - View subscribers

## Environment Variables

Backend (`backend/.env`):

- `PORT=5000`
- `MONGODB_URI=mongodb://localhost:27017/campus_assignment`
- `JWT_SECRET=...`
- `CLIENT_URL=http://localhost:5173`
- `ALLOWED_ORIGINS=http://localhost:5173,https://your-app.vercel.app,*.vercel.app`
- `ADMIN_EMAIL=admin@example.com`
- `ADMIN_PASSWORD=admin123`

Frontend (`frontend/.env`):

- `VITE_API_URL=http://localhost:5000/api`

## REST API

Base `/api`:

- Auth: `POST /auth/login` → `{ token }`
- Projects: `GET /projects`, `POST /projects` (auth, multipart: `image`, `name`, `description`)
- Clients: `GET /clients`, `POST /clients` (auth, multipart: `image`, `name`, `designation`, `description`)
- Contacts: `GET /contacts` (auth), `POST /contacts` → `{ fullName, email, mobile, city }`
- Subscribers: `GET /subscribers` (auth), `POST /subscribers` → `{ email }` (duplicate-safe)

## Deployment

Below are two straightforward, production-friendly paths.

### Option A: Render (backend) + Vercel (frontend)

- Backend (Render)
  - Create a new Web Service from your repo pointing to `backend/`.
  - Build: `npm install`
  - Start: `node src/index.js`
  - Environment variables:
    - `PORT=5000`
    - `MONGODB_URI=<Your Atlas SRV URI>`
    - `JWT_SECRET=<random long string>`
    - `CLIENT_URL=<Your Vercel site URL>`
    - `ALLOWED_ORIGINS=<Your Vercel site URL>,*.vercel.app`
    - `ADMIN_EMAIL=<admin email>`
    - `ADMIN_PASSWORD=<admin password>`
  - Optional: add a persistent disk and mount `/app/uploads` if you want uploads to survive deploys.

- Frontend (Vercel)
  - Import the repo and set the Root Directory to `frontend/`.
  - Framework preset: Vite (auto-detected).
  - Build command: `npm run build`; Output directory: `dist`.
  - Environment variables:
    - `VITE_API_URL=<Your Render backend URL>/api`
  - Routing for SPA is configured via [frontend/vercel.json](frontend/vercel.json) to serve `index.html` for client-side routes (e.g., `/admin`).

Notes

- Keep Atlas Network Access updated (add your Render egress IP or allow access from anywhere if acceptable for a demo).
- CORS: set `CLIENT_URL` to your main frontend URL and `ALLOWED_ORIGINS` to include local dev and wildcard for Vercel previews (e.g., `*.vercel.app`).

### Option B: Docker (local or server VM)

- Backend image:
  - See [backend/Dockerfile](backend/Dockerfile).
  - Run with env vars and mount uploads:

  ```bash
  docker build -t lg-backend ./backend
  docker run -p 5000:5000 \
    -e MONGODB_URI="<Atlas URI>" \
    -e JWT_SECRET="<secret>" \
    -e CLIENT_URL="http://localhost:5173" \
    -e ADMIN_EMAIL="<email>" \
    -e ADMIN_PASSWORD="<password>" \
    -v $(pwd)/backend/uploads:/app/uploads \
    --name lg-backend lg-backend
  ```

- Frontend build + serve:
  - Build locally and serve the `dist/` with any static server (Netlify CLI, Nginx, etc.).

  ```bash
  cd frontend
  npm install
  VITE_API_URL=http://localhost:5000/api npm run build
  npx serve dist -p 5173
  ```

### Publish Repository

```powershell
git init
git add .
git commit -m "Initial full-stack implementation"
git branch -M main
git remote add origin <YOUR_REMOTE_URL>
git push -u origin main
```

Ensure the repo is public and contains all files. Do not mention any company name in the repo name or code.

## Notes

- Uploaded images served from `/uploads/*` via backend.
- Image processing uses Sharp to enforce 450x350 crop/resize.
- Clean, modular code with meaningful names and basic error handling.
- Tailwind v4 configured with `@tailwindcss/postcss`; styles imported via `@import "tailwindcss"`.
