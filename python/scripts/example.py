from flask import Flask, request, jsonify
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
import json

app = Flask(__name__)

def prepare_dataframe(data):
    """Convert JSON data into a DataFrame and preprocess it."""
    df = pd.DataFrame(data)
    df['date'] = pd.to_datetime(df['date'])
    numeric_columns = df.columns.drop('date')
    df[numeric_columns] = df[numeric_columns].astype(float)

    # Limit the x-axis to a maximum of 12 points by grouping data
    if len(df) > 12:
        df = df.resample(f"{len(df)//12}D", on='date').mean().reset_index()
    
    return df

def generate_visualizations(df, pollutant):
    """Generate and save visualizations."""
    output_dir = "static/visualizations"
    os.makedirs(output_dir, exist_ok=True)

    # Heatmap of correlations
    heatmap_path = os.path.join(output_dir, "heatmap.png")
    plt.figure(figsize=(10, 6))
    correlation = df[df.columns.drop('date')].corr()
    sns.heatmap(correlation, annot=True, cmap='coolwarm', fmt=".2f")
    plt.title("Correlation Heatmap")
    plt.savefig(heatmap_path)
    plt.close()

    # Line chart for the chosen pollutant
    line_chart_path = os.path.join(output_dir, f"{pollutant}_line_chart.png")
    plt.figure(figsize=(10, 6))
    plt.plot(df['date'], df[pollutant], marker='o', label=pollutant)
    plt.title(f"{pollutant} Levels Over Time")
    plt.xlabel("Date")
    plt.ylabel(pollutant)
    plt.grid()
    plt.xticks(rotation=45)
    plt.legend()
    plt.savefig(line_chart_path)
    plt.close()

    # Scatter plot: AQI vs chosen pollutant
    scatter_plot_path = os.path.join(output_dir, f"AQI_vs_{pollutant}_scatter.png")
    plt.figure(figsize=(8, 6))
    plt.scatter(df['AQI'], df[pollutant], c='blue', alpha=0.6)
    plt.title(f"AQI vs {pollutant}")
    plt.xlabel("AQI")
    plt.ylabel(pollutant)
    plt.grid()
    plt.savefig(scatter_plot_path)
    plt.close()

    return {
        "heatmap": heatmap_path,
        "line_chart": line_chart_path,
        "scatter_plot": scatter_plot_path
    }

@app.route('/visualize', methods=['POST'])
def visualize():
    try:
        # Parse request data
        data = request.json.get('data', [])
        pollutant = request.json.get('pollutant', None)
     

        if not data or not pollutant:
            return jsonify({"error": "Missing data or pollutant."}), 400

        # Prepare data and generate visualizations
        df = prepare_dataframe(data)
        visualizations = generate_visualizations(df, pollutant)
       
        return jsonify({
            "message": "Visualizations created successfully.",
            "visualizations": visualizations
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
