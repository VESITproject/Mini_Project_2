import requests

def get_coordinates_from_osm(location):
    endpoint = "https://geocode.xyz"
    params = {
        'locate': location,
        'json': '1'
    }

    response = requests.get(endpoint, params=params)

    if response.status_code == 200:
        data = response.json()
        
        if 'latt' in data and 'longt' in data:
            lat = data['latt']
            lon = data['longt']
          
            return {"lat": lat, "lon": lon}
        else:
            print("Location not found.")
            return None
    else:
        print(f"Error: {response.status_code}")
        return None

