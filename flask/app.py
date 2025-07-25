from flask import Flask, request, jsonify
import pandas as pd
import joblib
from datetime import datetime
from dateutil.relativedelta import relativedelta
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Load the trained model
model = joblib.load('room_vacancy_model.pkl')

# Load the dataset to get the latest vacancy percentage
df = pd.read_csv('room_vacancy1.csv')  # Replace with your dataset file
df['date'] = pd.to_datetime(df['date'])

# Function to extract booking date from user input
def extract_booking_date(user_input):
    today = datetime.today()
    
    # Check if the input is a specific date (e.g., "2023-11-15")
    try:
        booking_date = datetime.strptime(user_input, '%Y-%m-%d')
        return booking_date
    except ValueError:
        pass  # Not a specific date, continue to check for relative terms

    # Handle relative terms like "next week" or "next month"
    if "next week" in user_input:
        booking_date = today + relativedelta(weeks=1)
    elif "next month" in user_input:
        booking_date = today + relativedelta(months=1)
    else:
        booking_date = today  # Default to today if no specific date is mentioned

    return booking_date

# Function to prepare input data for prediction
def prepare_input(booking_date, is_holiday=0):
    # Extract month and day of the week from the date
    month = booking_date.month
    day_of_week = booking_date.strftime('%A')  # e.g., Monday

    # Create a DataFrame with the input features
    input_data = {
        'month': [month],
        'day_of_week': [day_of_week],
        'is_holiday': [is_holiday]
    }
    input_df = pd.DataFrame(input_data)

    # One-hot encode the day_of_week column
    input_df = pd.get_dummies(input_df, columns=['day_of_week'], drop_first=True)

    # Ensure all required columns are present
    required_columns = ['month', 'is_holiday', 'day_of_week_Monday', 'day_of_week_Saturday',
                        'day_of_week_Sunday', 'day_of_week_Thursday', 'day_of_week_Tuesday',
                        'day_of_week_Wednesday']
    for col in required_columns:
        if col not in input_df.columns:
            input_df[col] = 0

    # Reorder columns to match the training data
    input_df = input_df[required_columns]
    return input_df

# Function to get current vacancy percentage
def get_current_vacancy_percentage():
    # Get the latest vacancy percentage from the dataset
    latest_vacancy_percentage = df.iloc[-1]['vacancy_percentage']
    return latest_vacancy_percentage

# Flask route to handle predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Get user input from the request
    data = request.json
    user_input = data.get('user_input')
    is_holiday = data.get('is_holiday', 0)  # Default to 0 if not provided

    # Extract booking date from user input
    booking_date = extract_booking_date(user_input)

    # Get current vacancy percentage
    current_vacancy_percentage = get_current_vacancy_percentage()

    # Prepare input data for the booking date
    input_df = prepare_input(booking_date, is_holiday)

    # Predict vacancy percentage for the booking date
    booking_vacancy_percentage = model.predict(input_df)[0]
    booking_booking_percentage = 100 - booking_vacancy_percentage

    # Return predictions as JSON response
    return jsonify({
        'current_vacancy_percentage': current_vacancy_percentage,
        'booking_vacancy_percentage': booking_vacancy_percentage,
        'booking_booking_percentage': booking_booking_percentage,
        'booking_date': booking_date.strftime('%Y-%m-%d')
    })

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)