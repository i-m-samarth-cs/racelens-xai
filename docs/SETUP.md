# RaceLens XAI - Local Setup Guide

Complete guide to setting up RaceLens XAI on your local machine.

## Prerequisites

### Required Software

- **Node.js** 18+ and npm 9+
- **Python** 3.10+
- **Git**

### Optional (for full features)

- **PostgreSQL** 14+ (or use SQLite for development)
- **Redis** (for caching)
- **Docker** (for containerized deployment)

## Quick Start (5 minutes)

```bash
# 1. Clone repository
git clone https://github.com/yourusername/racelens-xai.git
cd racelens-xai

# 2. Setup environment
cp .env.example .env
# Edit .env with your API keys

# 3. Install frontend dependencies
cd frontend
npm install

# 4. Install backend dependencies
cd ../backend
pip install -r requirements.txt

# 5. Run development servers
# Terminal 1 - Backend
cd backend
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev

# 6. Open browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/docs
```

## Detailed Setup

### 1. Environment Configuration

Create `.env` file in project root:

```env
# IBM Granite
IBM_GRANITE_API_KEY=your_granite_api_key
IBM_GRANITE_API_URL=https://api.ibm.com/granite/v1
IBM_GRANITE_MODEL=granite-13b-instruct-v2

# Langflow
LANGFLOW_API_KEY=your_langflow_api_key
LANGFLOW_API_URL=https://api.langflow.org/v1
LANGFLOW_FLOW_ID=your_flow_id

# Docling
DOCLING_API_KEY=your_docling_api_key
DOCLING_API_URL=https://api.docling.com/v1

# Backend
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:3000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=RaceLens XAI

# Database (SQLite for development)
DATABASE_URL=sqlite:///./racelens.db

# Demo Mode
DEMO_MODE=true
ENABLE_LIVE_DATA=false
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

**Frontend Structure:**
```
frontend/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── page.tsx      # Landing page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   └── lib/             # Utilities
├── public/              # Static assets
└── package.json
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload --port 8000

# Run with custom host/port
uvicorn app.main:app --host 0.0.0.0 --port 8080

# Run tests
pytest

# Format code
black app/
```

**Backend Structure:**
```
backend/
├── app/
│   ├── main.py          # FastAPI app
│   ├── api/             # API routes
│   │   ├── incidents.py
│   │   ├── strategy.py
│   │   ├── documents.py
│   │   └── telemetry.py
│   ├── core/            # Core functionality
│   │   ├── config.py
│   │   └── logging.py
│   ├── models/          # Data models
│   └── services/        # Business logic
├── requirements.txt
└── Dockerfile
```

### 4. Data Setup

#### Fetch Demo Data

```bash
cd scripts

# Fetch FastF1 data
python fetch_fastf1_data.py

# Parse documents with Docling
python parse_docs_with_docling.py

# Seed demo scenarios (already included)
# Demo data is in: data/demo/incidents.json
```

#### Data Directory Structure

```
data/
├── raw/                 # Raw data files
├── processed/           # Processed data
├── demo/               # Demo scenarios
│   └── incidents.json  # 5 demo incidents
├── documents/          # Parsed documents
├── chunks/             # Document chunks for RAG
├── embeddings/         # Vector embeddings
└── fastf1_cache/       # FastF1 cache
```

### 5. Database Setup

#### SQLite (Development)

```bash
# Automatically created on first run
# Location: backend/racelens.db
```

#### PostgreSQL (Production)

```bash
# Install PostgreSQL
# Create database
createdb racelens

# Update .env
DATABASE_URL=postgresql://user:password@localhost:5432/racelens

# Run migrations
cd backend
alembic upgrade head
```

### 6. API Keys Setup

#### IBM Granite

1. Sign up at [IBM Cloud](https://cloud.ibm.com)
2. Create Watson Machine Learning instance
3. Get API key from credentials
4. Add to `.env`: `IBM_GRANITE_API_KEY=your_key`

#### Langflow

1. Sign up at [Langflow](https://langflow.org)
2. Create new flow
3. Get API key from settings
4. Add to `.env`: `LANGFLOW_API_KEY=your_key`

#### Docling

1. Access Docling API
2. Get API credentials
3. Add to `.env`: `DOCLING_API_KEY=your_key`

### 7. Verify Installation

#### Check Frontend

```bash
# Open browser
http://localhost:3000

# Should see:
# - Landing page with hero section
# - Navigation working
# - Smooth animations
```

#### Check Backend

```bash
# Open browser
http://localhost:8000/docs

# Should see:
# - FastAPI Swagger UI
# - All API endpoints listed
# - Health check working
```

#### Test API Endpoints

```bash
# Health check
curl http://localhost:8000/api/health

# Get incidents
curl http://localhost:8000/api/incidents/feed

# Get demo scenarios
curl http://localhost:8000/api/incidents/scenarios/list
```

## Development Workflow

### Frontend Development

```bash
cd frontend

# Start dev server with hot reload
npm run dev

# Make changes to components
# Browser auto-refreshes

# Check for errors
npm run lint

# Format code
npm run format
```

### Backend Development

```bash
cd backend

# Start with auto-reload
uvicorn app.main:app --reload

# Make changes to API routes
# Server auto-restarts

# Run tests
pytest

# Format code
black app/
```

### Adding New Features

1. **New API Endpoint:**
   ```python
   # backend/app/api/your_feature.py
   from fastapi import APIRouter
   
   router = APIRouter()
   
   @router.get("/your-endpoint")
   async def your_function():
       return {"message": "Hello"}
   ```

2. **New Frontend Page:**
   ```typescript
   // frontend/src/app/your-page/page.tsx
   export default function YourPage() {
     return <div>Your Page</div>
   }
   ```

## Troubleshooting

### Frontend Issues

**Port 3000 already in use:**
```bash
# Use different port
PORT=3001 npm run dev
```

**Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Backend Issues

**Port 8000 already in use:**
```bash
# Use different port
uvicorn app.main:app --port 8080
```

**Import errors:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

**Database errors:**
```bash
# Reset database
rm racelens.db
# Restart server (will recreate)
```

### Common Issues

**CORS errors:**
- Check `CORS_ORIGINS` in backend `.env`
- Ensure frontend URL is included

**API connection failed:**
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in frontend
- Test backend health: `curl http://localhost:8000/api/health`

**Missing API keys:**
- Verify all keys in `.env`
- Check key format and validity
- Enable demo mode: `DEMO_MODE=true`

## IDE Setup

### VS Code (Recommended)

**Extensions:**
- ESLint
- Prettier
- Python
- Pylance
- Tailwind CSS IntelliSense

**Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  }
}
```

### PyCharm

1. Open `backend` folder
2. Configure Python interpreter
3. Install requirements
4. Enable FastAPI support

## Next Steps

After setup:

1. ✅ Explore the landing page
2. ✅ Try demo scenarios
3. ✅ Test API endpoints
4. ✅ Review architecture
5. ✅ Read deployment guide
6. ✅ Start building features

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [FastF1 Documentation](https://docs.fastf1.dev)
- [IBM Granite](https://www.ibm.com/granite)

## Support

Need help?
- Check [Troubleshooting](#troubleshooting)
- Review [API Documentation](http://localhost:8000/docs)
- Open GitHub issue
- Check project README