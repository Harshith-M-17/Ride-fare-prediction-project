from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS  


app = Flask(__name__)
CORS(app)  


model = joblib.load('H:/Ride Fare prediction in ML model/fare_prediction_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
       
        data = request.get_json()

        duration = float(data.get('duration', 0))
        distance = float(data.get('distance', 0))
        ride_charge = float(data.get('ride_charge', 0))

        input_data = np.array([[duration, distance, ride_charge]])

        predicted_fare = model.predict(input_data)[0]

        response = jsonify({'predicted_fare': round(predicted_fare, 2)})
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        
        return response
    except Exception as e:
        response = jsonify({'error': str(e)})
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

if __name__ == '__main__':
    app.run(debug=True)
