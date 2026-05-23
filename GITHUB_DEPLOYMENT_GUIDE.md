# GitHub & Deployment Guide - RaceLens XAI

## 📦 Project Structure
We'll deploy as a **monorepo** (single repository with both frontend and backend).

```
racelens-xai/
├── frontend/          # Next.js app
├── backend/           # FastAPI app
├── docs/
├── scripts/
└── README.md
```

## 🚀 Step-by-Step GitHub Setup

### Step 1: Create .gitignore (if not exists)
Already handled - we'll check and update if needed.

### Step 2: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: RaceLens XAI - F1 AI Analysis Platform"
```

### Step 3: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `racelens-xai` (or your preferred name)
3. Description: "Explainable AI for F1 Racing - Incident Analysis & Strategy"
4. **Keep it Public** (or Private if you prefer)
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 4: Connect Local to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/racelens-xai.git
git branch -M main
git push -u origin main
```

## 🌐 Deployment Strategy

### Frontend → Vercel
- Vercel will auto-detect the `frontend` directory
- Deploys automatically on every push to main

### Backend → Render
- Render will use the `backend` directory
- Deploys automatically on every push to main

## 📋 Deployment Steps

### 1. Deploy Frontend to Vercel

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com` (add after backend deployment)
5. Click "Deploy"

**Option B: Via Vercel CLI**
```bash
cd frontend
vercel --prod
```

### 2. Deploy Backend to Render

1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `racelens-xai-api`
   - **Root Directory**: `backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables:
   ```
   HOST=0.0.0.0
   PORT=$PORT
   ENVIRONMENT=production
   DEBUG=false
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```
6. Click "Create Web Service"

### 3. Update Frontend with Backend URL

After backend is deployed:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL` with your Render URL
3. Redeploy: Vercel → Deployments → Click "..." → Redeploy

## 🔒 Important Files to Check

### .gitignore (Root)
```
# Dependencies
node_modules/
__pycache__/
*.pyc

# Environment
.env
.env.local
.env.*.local

# Build outputs
.next/
dist/
build/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Data
backend/data/fastf1_cache/
backend/data/embeddings/
*.db
*.sqlite

# Logs
*.log
logs/
```

## ✅ Post-Deployment Checklist

- [ ] GitHub repository created and pushed
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables set correctly
- [ ] CORS configured (backend allows frontend URL)
- [ ] Test all pages load correctly
- [ ] Test API endpoints work
- [ ] Fan Zone audio plays
- [ ] F1 GIFs display correctly

## 🔄 Future Updates

After initial deployment, any push to `main` branch will:
1. Auto-deploy frontend to Vercel
2. Auto-deploy backend to Render

```bash
# Make changes
git add .
git commit -m "Your update message"
git push origin main
```

## 🆘 Troubleshooting

**If Vercel can't find frontend:**
- Set Root Directory to `frontend` in project settings

**If Render can't find backend:**
- Set Root Directory to `backend` in service settings

**CORS errors:**
- Add your Vercel URL to `CORS_ORIGINS` in Render environment variables
- Format: `https://your-app.vercel.app` (no trailing slash)