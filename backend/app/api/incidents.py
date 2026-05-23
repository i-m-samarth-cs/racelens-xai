"""
Incident analysis endpoints
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from pydantic import BaseModel
from datetime import datetime
import json
import os

router = APIRouter()


class IncidentAnalysisRequest(BaseModel):
    """Request model for incident analysis"""
    incident_id: str
    description: str
    cars_involved: List[str]
    sector: str
    speed_delta: float
    track_zone: str
    flags: List[str]


class IncidentAnalysisResponse(BaseModel):
    """Response model for incident analysis"""
    incident_id: str
    classification: str
    confidence: float
    regulation_clause: str
    explanation: str
    precedent_cases: List[Dict[str, Any]]
    alternative_interpretations: List[str]
    suggested_decision: str
    fan_mode_summary: str
    evidence: List[Dict[str, Any]]


@router.get("/feed")
async def get_incident_feed() -> Dict[str, Any]:
    """
    Get live incident feed
    Returns recent incidents with risk scores
    """
    # Load demo incidents
    demo_file = "./data/demo/incidents.json"
    
    if os.path.exists(demo_file):
        with open(demo_file, 'r') as f:
            incidents = json.load(f)
    else:
        # Return sample data if file doesn't exist
        incidents = [
            {
                "id": "INC-001",
                "timestamp": datetime.utcnow().isoformat(),
                "type": "impeding",
                "severity": "medium",
                "risk_score": 0.72,
                "cars_involved": ["CAR-01", "CAR-14"],
                "sector": "Sector 2",
                "status": "under_investigation"
            },
            {
                "id": "INC-002",
                "timestamp": datetime.utcnow().isoformat(),
                "type": "track_limits",
                "severity": "low",
                "risk_score": 0.45,
                "cars_involved": ["CAR-07"],
                "sector": "Turn 9",
                "status": "noted"
            }
        ]
    
    return {
        "incidents": incidents,
        "total": len(incidents),
        "timestamp": datetime.utcnow().isoformat()
    }


@router.get("/{incident_id}")
async def get_incident(incident_id: str) -> Dict[str, Any]:
    """
    Get detailed incident information
    """
    # Load demo incidents
    demo_file = "./data/demo/incidents.json"
    
    if os.path.exists(demo_file):
        with open(demo_file, 'r') as f:
            incidents = json.load(f)
            
        # Find incident
        incident = next((i for i in incidents if i.get("id") == incident_id), None)
        
        if incident:
            return incident
    
    # Return sample incident if not found
    return {
        "id": incident_id,
        "timestamp": datetime.utcnow().isoformat(),
        "type": "impeding",
        "description": "Driver on fast lap blocked by slow car",
        "cars_involved": ["CAR-01", "CAR-14"],
        "sector": "Turn 7-8 complex",
        "speed_delta": 45.0,
        "track_zone": "Sector 2",
        "flags": ["yellow"],
        "classification": "impeding",
        "confidence": 0.92,
        "regulation_clause": "Article 37.5",
        "explanation": "Driver CAR-14 was on a slow lap and failed to move off the racing line when CAR-01 approached on a fast lap. The speed differential of 45 km/h and the location in a high-speed section constitute clear impeding.",
        "suggested_decision": "Grid penalty (3 places) + €10,000 fine",
        "fan_mode_summary": "The slower car didn't get out of the way when the faster car was coming up behind on a flying lap. That's against the rules and usually gets a penalty."
    }


@router.post("/analyze")
async def analyze_incident(request: IncidentAnalysisRequest) -> IncidentAnalysisResponse:
    """
    Analyze an incident using AI pipeline
    Returns classification, confidence, and explanation
    """
    
    # TODO: Integrate with Langflow + Granite pipeline
    # For now, return mock analysis
    
    analysis = {
        "incident_id": request.incident_id,
        "classification": "impeding",
        "confidence": 0.92,
        "regulation_clause": "Article 37.5 - Impeding",
        "explanation": f"Analysis of incident {request.incident_id}: {request.description}. "
                      f"Speed delta of {request.speed_delta} km/h in {request.sector} indicates clear impeding. "
                      f"Cars involved: {', '.join(request.cars_involved)}. "
                      f"Based on precedent cases and regulation Article 37.5, this constitutes impeding.",
        "precedent_cases": [
            {
                "case_id": "2023-AUS-Q-IMP-01",
                "similarity": 0.87,
                "outcome": "3-place grid penalty",
                "description": "Similar impeding incident in qualifying"
            },
            {
                "case_id": "2023-BAH-Q-IMP-02",
                "similarity": 0.82,
                "outcome": "3-place grid penalty + fine",
                "description": "Impeding on fast lap in high-speed section"
            }
        ],
        "alternative_interpretations": [
            "Could be considered racing incident if CAR-14 was also on fast lap",
            "Severity could be reduced if visibility was compromised",
            "May warrant investigation for unsafe driving if pattern continues"
        ],
        "suggested_decision": "3-place grid penalty + €10,000 fine",
        "fan_mode_summary": "The slower car didn't move out of the way when the faster car was on a hot lap. That's against the rules and usually results in a grid penalty.",
        "evidence": [
            {
                "type": "telemetry",
                "description": "Speed differential: 45 km/h",
                "confidence": 0.95
            },
            {
                "type": "regulation",
                "description": "Article 37.5 - Unnecessary impeding",
                "confidence": 0.98
            },
            {
                "type": "precedent",
                "description": "Similar cases resulted in 3-place penalties",
                "confidence": 0.85
            }
        ]
    }
    
    return IncidentAnalysisResponse(**analysis)


@router.get("/scenarios/list")
async def list_demo_scenarios() -> Dict[str, Any]:
    """
    List available demo scenarios
    """
    scenarios = [
        {
            "id": "DEMO-001",
            "title": "Qualifying Impeding",
            "description": "Driver on fast lap blocked by slow car",
            "type": "impeding",
            "confidence": 92
        },
        {
            "id": "DEMO-002",
            "title": "Unsafe Pit Release",
            "description": "Car released into approaching traffic",
            "type": "unsafe_release",
            "confidence": 88
        },
        {
            "id": "DEMO-003",
            "title": "Lap 1 Collision",
            "description": "Contact causing retirement",
            "type": "collision",
            "confidence": 76
        },
        {
            "id": "DEMO-004",
            "title": "Track Limits",
            "description": "Multiple violations, advantage gained",
            "type": "track_limits",
            "confidence": 94
        },
        {
            "id": "DEMO-005",
            "title": "Rain Strategy",
            "description": "Pit timing with weather approaching",
            "type": "strategy",
            "confidence": 78
        }
    ]
    
    return {
        "scenarios": scenarios,
        "total": len(scenarios)
    }

# Made with Bob
