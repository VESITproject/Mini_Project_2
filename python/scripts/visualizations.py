# import matplotlib.pyplot as plt
# import seaborn as sns
# import pandas as pd
# from datetime import datetime
# from io import BytesIO

# # Convert Unix timestamp to human-readable datetime format
# def unix_to_datetime(unix_timestamp):
#     date_time = datetime.fromtimestamp(unix_timestamp)
#     return date_time.strftime('%Y-%m-%d %H:%M:%S')

# # Aggregate AQI data by date
# def aggregate_aqi_data(data):
#     grouped_data = {}
#     for entry in data["list"]:
#         date = unix_to_datetime(entry["dt"]).split(' ')[0]
#         if date not in grouped_data:
#             grouped_data[date] = {
#                 "date": date,
#                 "AQI": 0, "CO": 0, "NO": 0, "NO2": 0, "O3": 0, "SO2": 0,
#                 "PM2_5": 0, "PM10": 0, "NH3": 0, "count": 0
#             }

#         # Aggregating values for each day
#         grouped_data[date]["AQI"] += entry["main"]["aqi"]
#         grouped_data[date]["CO"] += entry["components"]["co"]
#         grouped_data[date]["NO"] += entry["components"]["no"]
#         grouped_data[date]["NO2"] += entry["components"]["no2"]
#         grouped_data[date]["O3"] += entry["components"]["o3"]
#         grouped_data[date]["SO2"] += entry["components"]["so2"]
#         grouped_data[date]["PM2_5"] += entry["components"]["pm2_5"]
#         grouped_data[date]["PM10"] += entry["components"]["pm10"]
#         grouped_data[date]["NH3"] += entry["components"]["nh3"]
#         grouped_data[date]["count"] += 1
    
#     # Calculate average values for each day
#     final_data = []
#     for item in grouped_data.values():
#         final_data.append({
#             "date": item["date"],
#             "AQI": round(item["AQI"] / item["count"], 2),
#             "CO": round(item["CO"] / item["count"], 2),
#             "NO": round(item["NO"] / item["count"], 2),
#             "NO2": round(item["NO2"] / item["count"], 2),
#             "O3": round(item["O3"] / item["count"], 2),
#             "SO2": round(item["SO2"] / item["count"], 2),
#             "PM2_5": round(item["PM2_5"] / item["count"], 2),
#             "PM10": round(item["PM10"] / item["count"], 2),
#             "NH3": round(item["NH3"] / item["count"], 2)
#         })
    
#     return pd.DataFrame(final_data)

# # Generate the correlation heatmap
# def generate_heatmap(df):
#     img_buffer = BytesIO()
#     plt.figure(figsize=(10, 6))
#     correlation = df.drop('date', axis=1).corr()
#     sns.heatmap(correlation, annot=True, cmap='coolwarm', fmt=".2f")
#     plt.title("Correlation Heatmap")
#     plt.savefig(img_buffer, format='png')
#     plt.close()
#     img_buffer.seek(0)
#     return img_buffer

# # Generate a line chart for AQI
# def generate_line_chart(df):
#     img_buffer = BytesIO()
#     plt.figure(figsize=(10, 6))
#     plt.plot(df['date'], df['AQI'], marker='o', label="AQI")
#     plt.title("AQI Levels Over Time")
#     plt.xlabel("Date")
#     plt.ylabel("AQI")
#     plt.xticks(rotation=45)
#     plt.legend()
#     plt.savefig(img_buffer, format='png')
#     plt.close()
#     img_buffer.seek(0)
#     return img_buffer

# # Generate a scatter plot for AQI vs PM2.5
# def generate_scatter_plot(df):
#     img_buffer = BytesIO()
#     plt.figure(figsize=(8, 6))
#     plt.scatter(df['AQI'], df['PM2_5'], c='blue', alpha=0.6)
#     plt.title("AQI vs PM2.5")
#     plt.xlabel("AQI")
#     plt.ylabel("PM2.5")
#     plt.grid()
#     plt.savefig(img_buffer, format='png')
#     plt.close()
#     img_buffer.seek(0)
#     return img_buffer

# # Main function to generate visualizations and return as image buffers
# def generate_visualizations(data):
#     # Aggregate data
#     df = aggregate_aqi_data(data)

#     # Generate images as in-memory files (BytesIO)
#     heatmap_img = generate_heatmap(df)
#     line_chart_img = generate_line_chart(df)
#     scatter_plot_img = generate_scatter_plot(df)

#     # Return image buffers
#     return {
#         "heatmap": heatmap_img,
#         "line_chart": line_chart_img,
#         "scatter_plot": scatter_plot_img
#     }
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from datetime import datetime
from io import BytesIO

# Convert Unix timestamp to human-readable datetime format
def unix_to_datetime(unix_timestamp):
    date_time = datetime.fromtimestamp(unix_timestamp)
    return date_time.strftime('%Y-%m-%d %H:%M:%S')

# Aggregate AQI data by date for a specific pollutant
def aggregate_aqi_data(data, pollutant):
    grouped_data = {}
    for entry in data["list"]:
        date = unix_to_datetime(entry["dt"]).split(' ')[0]
        if date not in grouped_data:
            grouped_data[date] = {
                "date": date,
                pollutant: 0,  # Only store the specific pollutant
                "count": 0
            }

        # Aggregating values for the specific pollutant
        if pollutant == "AQI":
            grouped_data[date]["AQI"] += entry["main"]["aqi"]
        elif pollutant == "CO":
            grouped_data[date]["CO"] += entry["components"]["co"]
        elif pollutant == "NO":
            grouped_data[date]["NO"] += entry["components"]["no"]
        elif pollutant == "NO2":
            grouped_data[date]["NO2"] += entry["components"]["no2"]
        elif pollutant == "O3":
            grouped_data[date]["O3"] += entry["components"]["o3"]
        elif pollutant == "SO2":
            grouped_data[date]["SO2"] += entry["components"]["so2"]
        elif pollutant == "PM2_5":
            grouped_data[date]["PM2_5"] += entry["components"]["pm2_5"]
        elif pollutant == "PM10":
            grouped_data[date]["PM10"] += entry["components"]["pm10"]
        elif pollutant == "NH3":
            grouped_data[date]["NH3"] += entry["components"]["nh3"]
        
        grouped_data[date]["count"] += 1

    # Calculate average values for each day for the specific pollutant
    final_data = []
    for item in grouped_data.values():
        final_data.append({
            "date": item["date"],
            pollutant: round(item[pollutant] / item["count"], 2)  # Only store the average for the requested pollutant
        })

    return pd.DataFrame(final_data)

# Generate the line chart for the specific pollutant
def generate_line_chart(df, pollutant):
    img_buffer = BytesIO()
    plt.figure(figsize=(10, 6))
    plt.plot(df['date'], df[pollutant], marker='o', label=pollutant)
    plt.title(f"{pollutant} Levels Over Time")
    plt.xlabel("Date")
    plt.ylabel(pollutant)
    plt.xticks(rotation=45)
    plt.legend()
    plt.savefig(img_buffer, format='png')
    plt.close()
    img_buffer.seek(0)
    return img_buffer

# Generate the correlation heatmap (if you need correlations between pollutants)
def generate_heatmap(df):
    img_buffer = BytesIO()
    plt.figure(figsize=(10, 6))
    correlation = df.drop('date', axis=1).corr()
    sns.heatmap(correlation, annot=True, cmap='coolwarm', fmt=".2f")
    plt.title("Correlation Heatmap")
    plt.savefig(img_buffer, format='png')
    plt.close()
    img_buffer.seek(0)
    return img_buffer

# Generate a scatter plot for AQI vs PM2.5 (this could be more relevant depending on the selected pollutant)
def generate_scatter_plot(df, pollutant):
    img_buffer = BytesIO()
    plt.figure(figsize=(8, 6))
    if pollutant == "AQI" or pollutant == "PM2_5":
        plt.scatter(df['date'], df[pollutant], c='blue', alpha=0.6)
        plt.title(f"{pollutant} vs Time")
        plt.xlabel("Date")
        plt.ylabel(pollutant)
    plt.grid()
    plt.savefig(img_buffer, format='png')
    plt.close()
    img_buffer.seek(0)
    return img_buffer

# Main function to generate visualizations for a specific pollutant
def generate_visualizations(data, pollutant):
    # Aggregate data for the specific pollutant
    df = aggregate_aqi_data(data, pollutant)

    # Generate images as in-memory files (BytesIO)
    line_chart_img = generate_line_chart(df, pollutant)
    heatmap_img = generate_heatmap(df)
    scatter_plot_img = generate_scatter_plot(df, pollutant)

    # Return image buffers
    return {
        "line_chart": line_chart_img,
        "heatmap": heatmap_img,
        "scatter_plot": scatter_plot_img
    }
