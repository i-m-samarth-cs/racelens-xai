# RaceLens XAI - Deployment Steps

## Current Progress

### ✅ Completed
1. Frontend dependencies installed
2. Frontend build in progress...

### 🔄 In Progress
- Building optimized production bundle

### ⏳ Next Steps
1. Install backend dependencies
2. Test backend locally
3. Deploy to Vercel (Frontend)
4. Deploy to Render/Railway (Backend)

## Quick Deployment Commands

### Frontend (Vercel)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

### Backend (Local Test First)
```bash
# Install dependencies
cd backend
pip install -r requirements.txt

# Run locally
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Backend (Render Deployment)
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3

## Environment Variables Needed

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=RaceLens XAI
```

### Backend (.env)
```env
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=development
DEBUG=true
CORS_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

## Post-Deployment Checklist
- [ ] Frontend accessible at Vercel URL
- [ ] Backend API responding at /api/health
- [ ] CORS configured correctly
- [ ] All API endpoints working
- [ ] Demo scenarios loading
- [ ] Fan mode with audio working