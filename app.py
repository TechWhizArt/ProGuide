from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB connection details
host = "localhost"  # MongoDB server host (can be localhost or a remote address)
port = 27017  # Default MongoDB port
database_name = "education"
collection_name = "students"  # The collection for storing student data

# Connect to MongoDB
client = MongoClient(host, port)
db = client[database_name]  # Access the database
students_collection = db[collection_name]  # Access the students collection

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    try:
        # Check if user already exists
        existing_user = students_collection.find_one({'username': username})
        if existing_user:
            return jsonify({'error': 'User already exists'}), 400

        # Create a user data dictionary
        user_data = {
            'username': username,
            'password': password,  # Directly store the password without hashing
            'date_added': datetime.now()
        }

        # Insert the user data into the MongoDB collection
        students_collection.insert_one(user_data)

        return jsonify({'message': 'User registered successfully'})

    except Exception as error:
        print(f"Error: {error}")
        return jsonify({'error': 'Failed to register user'}), 500

if __name__ == '__main__':
    app.run(debug=True)
