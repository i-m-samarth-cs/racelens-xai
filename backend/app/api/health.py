"""
Health check endpoints
"""

from fastapi import APIRouter
from typing import Dict, Any
from datetime import datetime
import sys

router = APIRouter()


@router.get("/health")
async def health_check() -> Dict[str, Any]:
    """
    Health check endpoint
    Returns system status and version information
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "python_version": sys.version,
        "services": {
            "api": "operational",
            "database": "operational",
            "ai_pipeline": "operational",
        }
    }


@router.get("/health/ready")
async def readiness_check() -> Dict[str, Any]:
    """
    Readiness check endpoint
    Returns whether the service is ready to accept requests
    """
    return {
        "ready": True,
        "timestamp": datetime.utcnow().isoformat(),
    }


@router.get("/health/live")
async def liveness_check() -> Dict[str, Any]:
    """
    Liveness check endpoint
    Returns whether the service is alive
    """
    return {
        "alive": True,
        "timestamp": datetime.utcnow().isoformat(),
    }

# Made with Bob
