# RaceLens XAI - Deployment Guide

This guide covers deploying RaceLens XAI to production environments.

## Quick Deploy

### Frontend (Vercel)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Deploy from frontend directory
   cd frontend
   vercel --prod
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_API_URL`: Your backend API URL
     - `NEXT_PUBLIC_APP_NAME`: RaceLens XAI

3. **Custom Domain (Optional)**
   - Add custom domain in Vercel dashboard
   - Update DNS records as instructed

### Backend (Render)

1. **Create New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` directory

2. **Configure Service**
   ```yaml
   Name: racelens-xai-api
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

3. **Set Environment Variables**
   ```
   IBM_GRANITE_API_KEY=your_key
   IBM_GRANITE_API_URL=https://api.ibm.com/granite/v1
   LANGFLOW_API_KEY=your_key
   DOCLING_API_KEY=your_key
   DATABASE_URL=your_database_url
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy on push to main branch

### Backend (Railway) - Alternative

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Initialize Project**
   ```bash
   cd backend
   railway init
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set IBM_GRANITE_API_KEY=your_key
   railway variables set LANGFLOW_API_KEY=your_key
   # ... add all required variables
   ```

4. **Deploy**
   ```bash
   railway up
   ```

## Docker Deployment

### Build and Run Locally

```bash
# Backend
cd backend
docker build -t racelens-api .
docker run -p 8000:8000 --env-file .env racelens-api

# Frontend
cd frontend
docker build -t racelens-frontend .
docker run -p 3000:3000 racelens-frontend
```

### Docker Compose

```bash
# From project root
docker-compose up -d
```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-api.onrender.com
NEXT_PUBLIC_APP_NAME=RaceLens XAI
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Backend (.env)
```env
# IBM Stack
IBM_GRANITE_API_KEY=your_granite_key
IBM_GRANITE_API_URL=https://api.ibm.com/granite/v1
LANGFLOW_API_KEY=your_langflow_key
DOCLING_API_KEY=your_docling_key

# Server
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=production
DEBUG=false

# CORS
CORS_ORIGINS=https://your-frontend.vercel.app,https://your-custom-domain.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/racelens

# Security
JWT_SECRET=your-secure-secret-key
SESSION_SECRET=your-session-secret

# Feature Flags
DEMO_MODE=true
ENABLE_LIVE_DATA=false
```

## Database Setup

### PostgreSQL (Recommended for Production)

1. **Create Database**
   ```bash
   # On Render, Railway, or your provider
   # Database will be automatically created
   ```

2. **Run Migrations**
   ```bash
   cd backend
   alembic upgrade head
   ```

### SQLite (Development Only)

```bash
# Automatically created on first run
# Located at: backend/racelens.db
```

## Data Initialization

### 1. Fetch Demo Data

```bash
cd scripts
python fetch_fastf1_data.py
python parse_docs_with_docling.py
```

### 2. Load into Database

```bash
cd backend
python -m app.scripts.seed_database
```

## Monitoring & Logging

### Health Checks

- Frontend: `https://your-app.vercel.app/`
- Backend: `https://your-api.onrender.com/api/health`

### Logs

**Vercel:**
```bash
vercel logs
```

**Render:**
- View logs in Render Dashboard → Service → Logs

**Railway:**
```bash
railway logs
```

## Performance Optimization

### Frontend

1. **Enable Image Optimization**
   - Already configured in `next.config.js`
   - Uses Vercel's automatic image optimization

2. **Enable Caching**
   - Static assets cached automatically
   - API responses cached with SWR

3. **Code Splitting**
   - Automatic with Next.js
   - Dynamic imports for heavy components

### Backend

1. **Enable Redis Caching** (Optional)
   ```bash
   # Add Redis URL to environment
   REDIS_URL=redis://your-redis-url:6379
   ```

2. **Database Connection Pooling**
   ```python
   # Already configured in SQLAlchemy settings
   pool_size=20
   max_overflow=10
   ```

3. **Rate Limiting**
   ```python
   # Configured in settings
   RATE_LIMIT_PER_MINUTE=60
   RATE_LIMIT_PER_HOUR=1000
   ```

## Security Checklist

- [ ] Change all default secrets in production
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Set secure CORS origins
- [ ] Enable rate limiting
- [ ] Use environment variables for all secrets
- [ ] Enable database SSL connections
- [ ] Set up monitoring and alerts
- [ ] Regular security updates

## Scaling

### Horizontal Scaling

**Render:**
- Go to Service Settings → Scaling
- Increase instance count

**Railway:**
- Automatic scaling based on load

### Vertical Scaling

- Upgrade instance size in provider dashboard
- Recommended: 1GB RAM minimum for backend

## Troubleshooting

### Frontend Issues

**Build Fails:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**API Connection Issues:**
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify CORS settings on backend
- Check network tab in browser DevTools

### Backend Issues

**Import Errors:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

**Database Connection:**
- Verify `DATABASE_URL` format
- Check database is running
- Verify network access

**API Key Issues:**
- Verify all API keys are set
- Check key permissions
- Test keys with provider's test endpoint

## Rollback

### Vercel
```bash
# Rollback to previous deployment
vercel rollback
```

### Render
- Go to Dashboard → Deployments
- Click "Rollback" on previous successful deployment

### Railway
```bash
railway rollback
```

## Support

For deployment issues:
1. Check logs first
2. Review environment variables
3. Test locally with production settings
4. Open GitHub issue with logs

## Next Steps

After deployment:
1. Test all API endpoints
2. Verify demo scenarios work
3. Check analytics integration
4. Set up monitoring alerts
5. Configure backup strategy