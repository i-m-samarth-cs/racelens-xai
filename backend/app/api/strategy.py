"""
Strategy recommendation endpoints
"""

from fastapi import APIRouter
from typing import Dict, Any, List
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()


class StrategyRequest(BaseModel):
    """Request model for strategy recommendation"""
    session_id: str
    lap: int
    tire_age: int
    tire_compound: str
    fuel_load: float
    weather_condition: str
    track_position: int


@router.post("/recommend")
async def recommend_strategy(request: StrategyRequest) -> Dict[str, Any]:
    """
    Get AI-powered strategy recommendation
    """
    
    # Mock strategy recommendation
    recommendation = {
        "strategy": "pit_now",
        "confidence": 0.78,
        "reasoning": f"Based on current tire age ({request.tire_age} laps) and weather conditions ({request.weather_condition}), "
                    f"pitting now provides optimal window. Track position P{request.track_position} allows clean air advantage.",
        "alternatives": [
            {
                "strategy": "extend_3_laps",
                "confidence": 0.65,
                "reasoning": "Extending stint could work if tire degradation remains stable"
            },
            {
                "strategy": "conserve_tires",
                "confidence": 0.42,
                "reasoning": "Conservative approach but risks losing positions"
            }
        ],
        "factors": {
            "tire_degradation": 0.72,
            "weather_risk": 0.35,
            "traffic_impact": 0.58,
            "safety_car_probability": 0.15
        },
        "expected_outcome": {
            "position_change": 0,
            "time_gain": 2.3,
            "risk_level": "medium"
        }
    }
    
    return recommendation


@router.get("/scenarios")
async def get_strategy_scenarios() -> Dict[str, Any]:
    """
    Get available strategy scenarios
    """
    scenarios = [
        {
            "id": "STRAT-001",
            "title": "Rain Window Decision",
            "description": "Weather approaching, optimal pit timing",
            "confidence": 78
        },
        {
            "id": "STRAT-002",
            "title": "Undercut Defense",
            "description": "Respond to competitor pit stop",
            "confidence": 85
        },
        {
            "id": "STRAT-003",
            "title": "Tire Management",
            "description": "Extend stint vs pit early",
            "confidence": 72
        }
    ]
    
    return {
        "scenarios": scenarios,
        "total": len(scenarios)
    }


@router.post("/explain")
async def explain_strategy(strategy_id: str) -> Dict[str, Any]:
    """
    Get detailed explanation of strategy decision
    """
    return {
        "strategy_id": strategy_id,
        "explanation": "Detailed strategy explanation with evidence and reasoning",
        "confidence": 0.82,
        "evidence": [
            {"type": "telemetry", "description": "Tire degradation analysis"},
            {"type": "weather", "description": "Rain probability forecast"},
            {"type": "historical", "description": "Similar race scenarios"}
        ]
    }

# Made with Bob
