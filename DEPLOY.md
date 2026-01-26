# Deployment Guide

This guide covers deploying the full-stack Sauna Wellness application.

## 1. Backend Deployment (Render / DigitalOcean)

The backend is a Node.js/Express app connected to MongoDB.

### Prerequisites
- MongoDB Atlas Cluster (Get connection string).
- GitHub Repository required for automated deployments.

### Steps for Render.com
1.  Push your code to GitHub.
2.  Log in to Render and create a **New Web Service**.
3.  Connect your GitHub repo.
4.  **Root Directory**: `backend`
5.  **Build Command**: `npm install`
6.  **Start Command**: `npm start`
7.  **Environment Variables**:
    - `MONGO_URI`: Your MongoDB Connection String.
    - `JWT_SECRET`: Any long random string.
    - `NODE_ENV`: `production`
8.  Deploy. Render will provide a URL (e.g., `https://my-backend.onrender.com`).

## 2. Frontend Deployment (Vercel)

The frontend is a React (Vite) app.

### Steps for Vercel
1.  Log in to Vercel and **Add New Project**.
2.  Import your GitHub repo.
3.  **Framework Preset**: Vite
4.  **Root Directory**: `frontend`
5.  **Build Command**: `npm run build`
6.  **Output Directory**: `dist`
7.  **Environment Variables**:
    - You need to point the frontend to your deployed backend.
    - Update `frontend/src/services/api.ts` to use an environment variable or manually change the URL before build.
    - Recommended: create `.env.production` in `frontend` folder:
      ```
      VITE_API_URL=https://my-backend.onrender.com/api
      ```
    - Update `api.ts`:
      ```javascript
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      ```
8.  Deploy.

## 3. Database Setup
- Ensure your MongoDB access list (Network Access) allows access from anywhere (`0.0.0.0/0`) or specifically from your backend IP.
- Create an Admin User manually via API (using Postman) or a seeding script to access the Admin Panel initially.
  - POST `/api/auth/register` with `{ "username": "admin", "password": "securepassword", "role": "admin" }`.

## 4. Local Development
- backend: `cd backend && npm run dev` (Port 5000)
- frontend: `cd frontend && npm run dev` (Port 8080 or similar)
