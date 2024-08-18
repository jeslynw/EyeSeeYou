from flask import Flask, make_response, request, jsonify
from functools import wraps
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, JWTManager
from Users import User
import getKey as gk
from flask_cors import CORS

app = Flask(__name__)
jwt = JWTManager(app)

# custom way to get tokens
def getkey():
    filename = 'api_secret.txt'
    return gk.get_key(filename, '=')

app.config['SECRET_KEY'] = getkey()

# def token_expiration(username):
#     return jwt.encode({'username': username, 'exp': str(datetime.now(timezone.utc) + timedelta(minutes=30))}, app.config['SECRET_KEY'])

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message': 'Invalid token'}), 403
        return func(*args, **kwargs)
    return decorated

#testing
# @app.route('/authorise')
# @token_required
# def authorise():
#     return 'JWT verified' 
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