"""
Configuration settings for RaceLens XAI Backend
"""

from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    APP_NAME: str = "RaceLens XAI"
    API_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    RELOAD: bool = True
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://racelens-xai.vercel.app",
    ]
    
    # Database
    DATABASE_URL: str = "sqlite:///./racelens.db"
    
    # IBM Granite
    IBM_GRANITE_API_KEY: str = ""
    IBM_GRANITE_API_URL: str = "https://api.ibm.com/granite/v1"
    IBM_GRANITE_MODEL: str = "granite-13b-instruct-v2"
    
    # Langflow
    LANGFLOW_API_KEY: str = ""
    LANGFLOW_API_URL: str = "https://api.langflow.org/v1"
    LANGFLOW_FLOW_ID: str = ""
    
    # Docling
    DOCLING_API_KEY: str = ""
    DOCLING_API_URL: str = "https://api.docling.com/v1"
    
    # FastF1
    FASTF1_CACHE_DIR: str = "./data/fastf1_cache"
    FASTF1_CACHE_ENABLED: bool = True
    
    # Data directories
    DATA_RAW_DIR: str = "./data/raw"
    DATA_PROCESSED_DIR: str = "./data/processed"
    DATA_DEMO_DIR: str = "./data/demo"
    DOCS_DIR: str = "./data/documents"
    CHUNKS_DIR: str = "./data/chunks"
    EMBEDDINGS_DIR: str = "./data/embeddings"
    
    # Feature flags
    ENABLE_LIVE_DATA: bool = False
    ENABLE_TELEMETRY: bool = True
    ENABLE_FAN_MODE: bool = True
    ENABLE_DOCUMENT_SEARCH: bool = True
    DEMO_MODE: bool = True
    
    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_PER_HOUR: int = 1000
    
    # Security
    JWT_SECRET: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION: int = 86400
    SESSION_SECRET: str = "your-session-secret-change-in-production"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "json"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()


# Ensure data directories exist
def ensure_directories():
    """Create necessary directories if they don't exist"""
    directories = [
        settings.DATA_RAW_DIR,
        settings.DATA_PROCESSED_DIR,
        settings.DATA_DEMO_DIR,
        settings.DOCS_DIR,
        settings.CHUNKS_DIR,
        settings.EMBEDDINGS_DIR,
        settings.FASTF1_CACHE_DIR,
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)


# Initialize directories on import
ensure_directories()

# Made with Bob
