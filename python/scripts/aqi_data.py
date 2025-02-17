import requests
from datetime import datetime
from geo_location import get_coordinates_from_osm

# Function to calculate UNIX timestamp range for the given days
def get_unix_range(duration_in_days):
    now = int(datetime.now().timestamp())
    past = now - (duration_in_days * 24 * 60 * 60)
    return {"start": past, "end": now}

# Function to fetch AQI historical data
def fetch_aqi_historical_data(days, location):
    coordinates = get_coordinates_from_osm(location)
    if not coordinates:
        return None

    lat, lon = coordinates["lat"], coordinates["lon"]
    time_range = get_unix_range(days)
    
    url = "http://api.openweathermap.org/data/2.5/air_pollution/history"
    params = {
        "lat": lat,
        "lon": lon,
        "start": time_range["start"],
        "end": time_range["end"],
        "appid": "d79463e5057c72a90084c7fa379fc999"
    }
    
    response = requests.get(url, params=params).json()
    return response


