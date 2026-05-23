# RaceLens XAI - Quick Start Guide

## 🚀 Fast Setup (5 Minutes)

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### Step 1: Install Backend Dependencies

```bash
cd backend

# Fix: Install compatible pandas version first
pip install pandas==1.5.3 numpy==1.24.3

# Then install remaining dependencies
pip install -r requirements.txt
```

**Note**: If you still encounter dependency conflicts with `ibm-watson-machine-learning`, you can install packages individually:

```bash
pip install fastapi==0.109.2
pip install uvicorn[standard]==0.27.1
pip install python-multipart==0.0.9
pip install python-dotenv==1.0.1
pip install pandas==1.5.3
pip install numpy==1.24.3
pip install fastf1==3.3.4
pip install sqlalchemy==2.0.27
pip install httpx==0.26.0
pip install aiohttp==3.9.3
pip install pydantic==2.6.1
pip install pydantic-settings==2.1.0
pip install loguru==0.7.2
```

### Step 2: Start Backend Server

```bash
# From backend directory
python -m uvicorn app.main:app --reload
```

Backend will run at: http://localhost:8000

### Step 3: Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

**Note**: You may see deprecation warnings - these are safe to ignore for development.

### Step 4: Start Frontend Server

```bash
# From frontend directory
npm run dev
```

Frontend will run at: http://localhost:3000

### Step 5: Open Application

Visit http://localhost:3000 in your browser!

## ✅ Verification

### Check Backend Health
```bash
curl http://localhost:8000/health
```

Should return:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-..."
}
```

### Check Frontend
- Landing page should load with hero section
- Navigation should work
- Dashboard should display demo data

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `uvicorn: command not found`
```bash
# Solution: Install uvicorn globally or use python -m
pip install uvicorn
# OR
python -m uvicorn app.main:app --reload
```

**Problem**: Dependency conflicts with pandas
```bash
# Solution: Use compatible versions
pip uninstall pandas numpy
pip install pandas==1.5.3 numpy==1.24.3
```

**Problem**: Port 8000 already in use
```bash
# Solution: Use different port
uvicorn app.main:app --reload --port 8001

# Update frontend/.env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

### Frontend Issues

**Problem**: `Invalid rewrite found` error
```bash
# Solution: Ensure .env file exists
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env
echo "NEXT_PUBLIC_APP_NAME=RaceLens XAI" >> .env
```

**Problem**: TypeScript errors
```bash
# Solution: These are expected before npm install
# Run npm install to resolve
npm install
```

**Problem**: Port 3000 already in use
```bash
# Solution: Use different port
npm run dev -- -p 3001
```

**Problem**: Module not found errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 Optional: Install IBM Stack Components

### IBM Granite (for AI reasoning)
```bash
pip install ibm-generative-ai==2.3.0
```

Set environment variable:
```bash
export IBM_GRANITE_API_KEY=your_key_here
```

### Docling (for document parsing)
```bash
pip install docling==1.0.0
```

### Langflow (for workflow orchestration)
```bash
pip install langflow
```

## 🎯 Demo Mode

The application works in **demo mode** without API keys:
- Uses mock data for incidents and strategy
- All features are functional
- No external API calls required

To enable full AI features, add API keys to `backend/.env`:
```bash
IBM_GRANITE_API_KEY=your_key
IBM_GRANITE_API_URL=https://api.ibm.com/granite
DOCLING_API_KEY=your_key
LANGFLOW_API_KEY=your_key
```

## 🚢 Production Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Backend (Render/Railway)
```bash
cd backend
# Follow platform-specific instructions
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

## 📚 Next Steps

1. **Explore Pages**:
   - Landing: http://localhost:3000
   - Dashboard: http://localhost:3000/dashboard
   - Incidents: http://localhost:3000/incidents
   - Strategy: http://localhost:3000/strategy
   - Documents: http://localhost:3000/documents
   - Fan Mode: http://localhost:3000/fan-mode
   - About: http://localhost:3000/about

2. **Review Documentation**:
   - [README.md](./README.md) - Project overview
   - [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System design
   - [SETUP.md](./docs/SETUP.md) - Detailed setup
   - [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Deployment guide

3. **Customize**:
   - Modify demo data in `data/demo/incidents.json`
   - Adjust styling in `frontend/src/app/globals.css`
   - Add new API endpoints in `backend/app/api/`

## 💡 Tips

- **Development**: Use `npm run dev` for hot reload
- **Production Build**: Use `npm run build` to test production build
- **Linting**: Use `npm run lint` to check code quality
- **Type Checking**: TypeScript errors are expected until dependencies are installed

## 🆘 Need Help?

- Check [GETTING_STARTED.md](./docs/GETTING_STARTED.md) for detailed instructions
- Review [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for system design
- See demo scenarios in `data/demo/incidents.json`

## ✨ Success!

If you see the RaceLens XAI landing page with the hero section and can navigate to the dashboard, you're all set! 🎉