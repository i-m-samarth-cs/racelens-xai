# 🏁 Getting Started with RaceLens XAI

Welcome to RaceLens XAI! This guide will get you up and running in **under 10 minutes**.

## What You're Building

An **explainable motorsport intelligence platform** that uses IBM's AI stack to:
- Analyze racing incidents with transparent reasoning
- Recommend race strategies with confidence scores
- Translate technical decisions into fan-friendly language
- Ground all decisions in FIA regulations

## Prerequisites

Before you start, make sure you have:

- ✅ **Node.js 18+** ([Download](https://nodejs.org))
- ✅ **Python 3.10+** ([Download](https://python.org))
- ✅ **Git** ([Download](https://git-scm.com))
- ⚠️ **IBM Granite API Key** (optional for demo mode)

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone & Setup (1 min)

```bash
# Clone the repository
git clone https://github.com/yourusername/racelens-xai.git
cd racelens-xai

# Copy environment template
cp .env.example .env
```

### Step 2: Configure Environment (1 min)

Edit `.env` file:

```env
# For demo mode, these are optional
IBM_GRANITE_API_KEY=your_key_here
LANGFLOW_API_KEY=your_key_here
DOCLING_API_KEY=your_key_here

# Required for local development
NEXT_PUBLIC_API_URL=http://localhost:8000
DATABASE_URL=sqlite:///./racelens.db
DEMO_MODE=true
```

**Note**: With `DEMO_MODE=true`, the app works without API keys using mock data.

### Step 3: Install Dependencies (2 min)

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd ../backend
pip install -r requirements.txt
```

### Step 4: Start Development Servers (1 min)

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Open Your Browser! 🎉

- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs

You should see the stunning RaceLens XAI landing page!

## 🎯 What to Try First

### 1. Explore the Landing Page
- Scroll through the hero section
- Check out the IBM stack integration
- View the 5 demo scenarios
- See the architecture preview

### 2. Test the API
Open http://localhost:8000/docs and try:

```bash
# Health check
GET /api/health

# Get incident feed
GET /api/incidents/feed

# Get demo scenarios
GET /api/incidents/scenarios/list

# Analyze an incident
POST /api/incidents/analyze
```

### 3. View Demo Data
Check out the 5 pre-configured scenarios:
```bash
cat data/demo/incidents.json
```

Each scenario includes:
- Complete incident details
- AI analysis with confidence scores
- Regulation citations
- Precedent cases
- Fan-friendly summaries

## 📚 Project Structure

```
racelens-xai/
├── frontend/          # Next.js app (landing page ready)
├── backend/           # FastAPI server (15+ endpoints)
├── data/             # Demo scenarios & data storage
├── scripts/          # Data ingestion tools
├── flows/            # AI workflows & prompts
└── docs/             # Comprehensive documentation
```

## 🎨 What's Already Built

### ✅ Complete & Working
- Landing page with animations
- Backend API with 15+ endpoints
- 5 demo incident scenarios
- IBM Granite prompt templates
- Langflow workflow configuration
- Data ingestion scripts
- Deployment configurations
- Comprehensive documentation

### 🚧 To Be Built (Optional)
- Dashboard page
- Incident analysis workspace
- Strategy workspace
- Document explorer
- Fan mode page
- About page

## 🔧 Development Workflow

### Making Changes

**Frontend:**
```bash
cd frontend
npm run dev          # Start dev server
npm run lint         # Check for errors
npm run format       # Format code
```

**Backend:**
```bash
cd backend
uvicorn app.main:app --reload  # Auto-reload on changes
pytest                          # Run tests
black app/                      # Format code
```

### Adding Features

1. **New API Endpoint:**
   - Edit `backend/app/api/your_feature.py`
   - Add route to `backend/app/main.py`
   - Test at http://localhost:8000/docs

2. **New Frontend Page:**
   - Create `frontend/src/app/your-page/page.tsx`
   - Access at http://localhost:3000/your-page

3. **New Component:**
   - Create `frontend/src/components/YourComponent.tsx`
   - Import and use in pages

## 🎓 Learning Resources

### IBM Stack
- **Granite**: [IBM Granite Docs](https://www.ibm.com/granite)
- **Docling**: Document parsing for AI
- **Langflow**: Visual AI workflow builder

### Technologies
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **FastAPI**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **FastF1**: [docs.fastf1.dev](https://docs.fastf1.dev)

## 🐛 Troubleshooting

### Port Already in Use

**Frontend (3000):**
```bash
PORT=3001 npm run dev
```

**Backend (8000):**
```bash
uvicorn app.main:app --port 8080
```

### Module Not Found

**Frontend:**
```bash
rm -rf node_modules .next
npm install
```

**Backend:**
```bash
pip install -r requirements.txt --force-reinstall
```

### API Connection Failed

1. Check backend is running: `curl http://localhost:8000/api/health`
2. Verify `NEXT_PUBLIC_API_URL` in frontend `.env`
3. Check CORS settings in backend

### Missing API Keys

Enable demo mode in `.env`:
```env
DEMO_MODE=true
```

## 🚀 Deployment

### Deploy to Production

**Frontend (Vercel):**
```bash
cd frontend
vercel --prod
```

**Backend (Render):**
1. Connect GitHub repo
2. Set environment variables
3. Deploy automatically

See `docs/DEPLOYMENT.md` for detailed instructions.

## 📖 Documentation

- **Setup Guide**: `docs/SETUP.md` - Detailed setup instructions
- **Deployment**: `docs/DEPLOYMENT.md` - Production deployment
- **Project Summary**: `PROJECT_SUMMARY.md` - What's been built
- **README**: `README.md` - Project overview

## 🎯 Next Steps

Now that you're set up:

1. ✅ **Explore the codebase**
   - Check out the landing page code
   - Review API endpoints
   - Look at demo scenarios

2. ✅ **Try the demo scenarios**
   - Test incident analysis
   - Check strategy recommendations
   - View fan-mode translations

3. ✅ **Read the documentation**
   - Architecture overview
   - IBM stack integration
   - Deployment guide

4. ✅ **Start building**
   - Add dashboard page
   - Create incident workspace
   - Build strategy interface

## 💡 Pro Tips

### Development
- Use `DEMO_MODE=true` for development without API keys
- Check API docs at `/docs` for all endpoints
- Use browser DevTools to debug frontend issues

### Code Quality
- Run linters before committing
- Format code with Prettier/Black
- Write tests for new features

### Performance
- Use React DevTools to profile components
- Check Network tab for API performance
- Monitor backend logs for errors

## 🤝 Need Help?

1. **Check Documentation**
   - `docs/SETUP.md` for setup issues
   - `docs/DEPLOYMENT.md` for deployment
   - `PROJECT_SUMMARY.md` for overview

2. **Review Examples**
   - Demo scenarios in `data/demo/`
   - API examples in `backend/app/api/`
   - Component examples in `frontend/src/`

3. **Test Endpoints**
   - Use API docs at http://localhost:8000/docs
   - Try curl commands
   - Check browser console

4. **Common Issues**
   - Port conflicts → Use different port
   - Module errors → Reinstall dependencies
   - API errors → Check backend logs

## 🎉 You're Ready!

You now have:
- ✅ A working development environment
- ✅ A stunning landing page
- ✅ A complete backend API
- ✅ 5 demo scenarios ready to test
- ✅ IBM stack integration
- ✅ Deployment configurations

**Start exploring and building!** 🏁

---

**Questions?** Check the docs or review the code examples.

**Ready to deploy?** See `docs/DEPLOYMENT.md`

**Want to contribute?** Follow the development workflow above.

**Happy coding!** 🚀