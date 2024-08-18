from flask import Flask, make_response, request, jsonify
from functools import wraps
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, JWTManager
from Users import User
import getKey as gk

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

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"message": "Invalid request"}), 400
    
    username = data.get('username')
    password = data.get('password')
    
    if User.authenticate(username, password):
        # token = token_expiration(username)
        
        access_token = create_access_token(identity=username)
        refresh_token = create_refresh_token(identity=username)
        
        return jsonify({'token': {
                                "access" : access_token, 
                                "refresh" : refresh_token
                                }
                        }
                       ), 200
    else:
        return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication Failed"'})

@app.route('/nadashboard', methods=['GET'])
@token_required
def go_to_dashboard():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200 

# if __name__ == '__main__':
#     app.run(debug=True)