"""
RaceLens XAI - FastAPI Backend
Main application entry point
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
from typing import Dict, Any

from app.api import incidents, strategy, documents, telemetry, health
from app.core.config import settings
from app.core.logging import setup_logging

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    logger.info("🏁 Starting RaceLens XAI Backend...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"API Version: {settings.API_VERSION}")
    
    # Initialize services
    try:
        # TODO: Initialize database connection
        # TODO: Initialize vector store
        # TODO: Load AI models
        logger.info("✅ Services initialized successfully")
    except Exception as e:
        logger.error(f"❌ Failed to initialize services: {e}")
        raise
    
    yield
    
    # Cleanup
    logger.info("🛑 Shutting down RaceLens XAI Backend...")
    # TODO: Close database connections
    # TODO: Cleanup resources


# Create FastAPI application
app = FastAPI(
    title="RaceLens XAI API",
    description="Explainable motorsport intelligence API powered by IBM Granite, Docling, and Langflow",
    version=settings.API_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "status_code": 500,
        },
    )


# Root endpoint
@app.get("/", tags=["Root"])
async def root() -> Dict[str, Any]:
    """Root endpoint with API information"""
    return {
        "name": "RaceLens XAI API",
        "version": settings.API_VERSION,
        "description": "Explainable motorsport intelligence API",
        "docs": "/docs",
        "health": "/api/health",
        "powered_by": ["IBM Granite", "Docling", "Langflow"],
    }


# Include routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(incidents.router, prefix="/api/incidents", tags=["Incidents"])
app.include_router(strategy.router, prefix="/api/strategy", tags=["Strategy"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(telemetry.router, prefix="/api/telemetry", tags=["Telemetry"])


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD,
        log_level=settings.LOG_LEVEL.lower(),
    )

# Made with Bob
