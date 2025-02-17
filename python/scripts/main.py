from flask import Flask, jsonify, request, send_file
from aqi_data import fetch_aqi_historical_data
from visualizations import generate_visualizations
from io import BytesIO

app = Flask(__name__)

# Function to get visualizations and return image buffers
@app.route('/get_visualizations', methods=['GET'])
def get_visualizations():
    location = request.args.get('location', 'mumbai')  # Default location is 'mumbai'
    days = int(request.args.get('days', 7))  # Default to 7 days
    pollutant = request.args.get('pollutant', 'AQI')  # Default pollutant is 'AQI'
    
    # Fetch AQI historical data
    aqi_data = fetch_aqi_historical_data(days, location)
    
    if aqi_data:
        # Generate visualizations
        visualizations = generate_visualizations(aqi_data, pollutant)
        
        # Return images as response (URLs for each image)
        return jsonify({
            "message": "Visualizations generated successfully!",
            "heatmap": "/heatmap",
            "line_chart": "/line_chart",
            "scatter_plot": "/scatter_plot"
        })
    else:
        return jsonify({"error": "Could not fetch AQI data"}), 400

# Serve image for heatmap
@app.route('/heatmap', methods=['GET'])
def get_heatmap():
    location = request.args.get('location', 'mumbai')
    days = int(request.args.get('days', 7))
    aqi_data = fetch_aqi_historical_data(days, location)
    
    if aqi_data:
        visualizations = generate_visualizations(aqi_data)
        # Get heatmap image as BytesIO and return as response
        return send_file(visualizations["heatmap"], mimetype='image/png')
    
    return jsonify({"error": "Could not fetch AQI data"}), 400

# Serve image for line chart
@app.route('/line_chart', methods=['GET'])
def get_line_chart():
    location = request.args.get('location', 'mumbai')
    days = int(request.args.get('days', 7))
    aqi_data = fetch_aqi_historical_data(days, location)
    
    if aqi_data:
        visualizations = generate_visualizations(aqi_data)
        # Get line chart image as BytesIO and return as response
        return send_file(visualizations["line_chart"], mimetype='image/png')
    
    return jsonify({"error": "Could not fetch AQI data"}), 400

# Serve image for scatter plot
@app.route('/scatter_plot', methods=['GET'])
def get_scatter_plot():
    location = request.args.get('location', 'mumbai')
    days = int(request.args.get('days', 7))
    aqi_data = fetch_aqi_historical_data(days, location)
    
    if aqi_data:
        visualizations = generate_visualizations(aqi_data)
        # Get scatter plot image as BytesIO and return as response
        return send_file(visualizations["scatter_plot"], mimetype='image/png')
    
    return jsonify({"error": "Could not fetch AQI data"}), 400

if __name__ == '__main__':
    app.run(debug=True)
