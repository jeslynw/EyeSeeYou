from flask import Flask, request, jsonify
from Users import User
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# import logging

# logging.basicConfig(level=logging.DEBUG)

@app.route('/login', methods=['POST'])
def login():
    # try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if User.authenticate(username, password):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Login failed"}), 401
    # except Exception as e:
    #     logging.error(f"An error occurred: {e}")
    #     return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True)