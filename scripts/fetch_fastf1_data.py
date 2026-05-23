"""
FastF1 Data Fetching Script
Downloads telemetry, lap times, and session data from FastF1
"""

import fastf1
import pandas as pd
import json
import os
from pathlib import Path
from datetime import datetime

# Enable FastF1 cache
cache_dir = Path("./data/fastf1_cache")
cache_dir.mkdir(parents=True, exist_ok=True)
fastf1.Cache.enable_cache(str(cache_dir))

# Output directories
output_dir = Path("./data/processed")
output_dir.mkdir(parents=True, exist_ok=True)


def fetch_session_data(year: int, gp: str, session_type: str):
    """
    Fetch session data from FastF1
    
    Args:
        year: Season year
        gp: Grand Prix name (e.g., 'Monaco', 'Bahrain')
        session_type: 'FP1', 'FP2', 'FP3', 'Q', 'R' (Race)
    """
    print(f"Fetching {year} {gp} {session_type}...")
    
    try:
        # Load session
        session = fastf1.get_session(year, gp, session_type)
        session.load()
        
        # Extract session info
        session_info = {
            "event": session.event['EventName'],
            "location": session.event['Location'],
            "country": session.event['Country'],
            "date": str(session.event['EventDate']),
            "session_type": session_type,
            "total_laps": len(session.laps),
        }
        
        # Extract lap data
        laps = session.laps
        lap_data = []
        
        for idx, lap in laps.iterrows():
            lap_data.append({
                "driver": lap['Driver'],
                "lap_number": int(lap['LapNumber']),
                "lap_time": str(lap['LapTime']) if pd.notna(lap['LapTime']) else None,
                "sector_1": str(lap['Sector1Time']) if pd.notna(lap['Sector1Time']) else None,
                "sector_2": str(lap['Sector2Time']) if pd.notna(lap['Sector2Time']) else None,
                "sector_3": str(lap['Sector3Time']) if pd.notna(lap['Sector3Time']) else None,
                "compound": lap['Compound'] if pd.notna(lap['Compound']) else None,
                "tire_life": int(lap['TyreLife']) if pd.notna(lap['TyreLife']) else None,
                "stint": int(lap['Stint']) if pd.notna(lap['Stint']) else None,
                "is_personal_best": bool(lap['IsPersonalBest']) if pd.notna(lap['IsPersonalBest']) else False,
            })
        
        # Extract weather data
        weather_data = []
        if hasattr(session, 'weather_data') and session.weather_data is not None:
            for idx, weather in session.weather_data.iterrows():
                weather_data.append({
                    "time": str(weather['Time']),
                    "air_temp": float(weather['AirTemp']) if pd.notna(weather['AirTemp']) else None,
                    "track_temp": float(weather['TrackTemp']) if pd.notna(weather['TrackTemp']) else None,
                    "humidity": float(weather['Humidity']) if pd.notna(weather['Humidity']) else None,
                    "pressure": float(weather['Pressure']) if pd.notna(weather['Pressure']) else None,
                    "wind_speed": float(weather['WindSpeed']) if pd.notna(weather['WindSpeed']) else None,
                    "rainfall": bool(weather['Rainfall']) if pd.notna(weather['Rainfall']) else False,
                })
        
        # Combine all data
        output_data = {
            "session_info": session_info,
            "laps": lap_data,
            "weather": weather_data,
            "fetched_at": datetime.utcnow().isoformat(),
        }
        
        # Save to file
        filename = f"{year}_{gp}_{session_type}.json"
        output_path = output_dir / filename
        
        with open(output_path, 'w') as f:
            json.dump(output_data, f, indent=2)
        
        print(f"✅ Saved to {output_path}")
        print(f"   - Total laps: {len(lap_data)}")
        print(f"   - Weather records: {len(weather_data)}")
        
        return output_data
        
    except Exception as e:
        print(f"❌ Error fetching {year} {gp} {session_type}: {e}")
        return None


def fetch_driver_telemetry(year: int, gp: str, session_type: str, driver: str, lap: int):
    """
    Fetch detailed telemetry for a specific driver and lap
    
    Args:
        year: Season year
        gp: Grand Prix name
        session_type: Session type
        driver: Driver code (e.g., 'VER', 'HAM')
        lap: Lap number
    """
    print(f"Fetching telemetry for {driver} lap {lap}...")
    
    try:
        session = fastf1.get_session(year, gp, session_type)
        session.load()
        
        # Get driver's lap
        driver_laps = session.laps.pick_driver(driver)
        lap_data = driver_laps[driver_laps['LapNumber'] == lap].iloc[0]
        
        # Get telemetry
        telemetry = lap_data.get_telemetry()
        
        # Convert to list of dicts
        telemetry_data = []
        for idx, row in telemetry.iterrows():
            telemetry_data.append({
                "time": str(row['Time']),
                "distance": float(row['Distance']) if pd.notna(row['Distance']) else None,
                "speed": float(row['Speed']) if pd.notna(row['Speed']) else None,
                "throttle": float(row['Throttle']) if pd.notna(row['Throttle']) else None,
                "brake": bool(row['Brake']) if pd.notna(row['Brake']) else False,
                "drs": int(row['DRS']) if pd.notna(row['DRS']) else 0,
                "gear": int(row['nGear']) if pd.notna(row['nGear']) else 0,
                "rpm": float(row['RPM']) if pd.notna(row['RPM']) else None,
            })
        
        output_data = {
            "driver": driver,
            "lap": lap,
            "lap_time": str(lap_data['LapTime']),
            "telemetry": telemetry_data,
            "fetched_at": datetime.utcnow().isoformat(),
        }
        
        # Save to file
        filename = f"{year}_{gp}_{session_type}_{driver}_lap{lap}_telemetry.json"
        output_path = output_dir / filename
        
        with open(output_path, 'w') as f:
            json.dump(output_data, f, indent=2)
        
        print(f"✅ Saved telemetry to {output_path}")
        print(f"   - Data points: {len(telemetry_data)}")
        
        return output_data
        
    except Exception as e:
        print(f"❌ Error fetching telemetry: {e}")
        return None


def main():
    """Main execution"""
    print("🏁 RaceLens XAI - FastF1 Data Fetcher")
    print("=" * 50)
    
    # Example: Fetch recent race data
    # Note: Adjust year and GP based on available data
    
    sessions_to_fetch = [
        (2023, 'Monaco', 'R'),
        (2023, 'Bahrain', 'Q'),
        (2023, 'Australia', 'R'),
    ]
    
    for year, gp, session_type in sessions_to_fetch:
        fetch_session_data(year, gp, session_type)
        print()
    
    # Example: Fetch specific telemetry
    # fetch_driver_telemetry(2023, 'Monaco', 'R', 'VER', 1)
    
    print("=" * 50)
    print("✅ Data fetching complete!")
    print(f"📁 Data saved to: {output_dir}")


if __name__ == "__main__":
    main()

# Made with Bob
