from flask import Flask, make_response, request, jsonify
from functools import wraps
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, JWTManager, decode_token, verify_jwt_in_request
from flask_jwt_extended.exceptions import JWTDecodeError
from jwt import ExpiredSignatureError, InvalidTokenError
from Users import User
from flask_cors import CORS
import getKey as gk

app = Flask(__name__)
jwt = JWTManager(app)
CORS(app, origins=['http://localhost:3000'])

# custom way to get tokens
def getkey():
    filename = 'api_secret.txt'
    return gk.get_key(filename, '=')

app.config['SECRET_KEY'] = getkey()

# def token_expiration(username):
#     return jwt.encode({'username': username, 'exp': str(datetime.now(timezone.utc) + timedelta(minutes=30))}, app.config['SECRET_KEY'])

# def token_required(func):
#     @wraps(func)
#     def decorated(*args, **kwargs):
#         token = request.args.get('token')
#         if not token:
#             return jsonify({'message': 'Token is missing!'}), 401
#         try:
#             data = jwt.decode(token, app.config['SECRET_KEY'])
#         except:
#             return jsonify({'message': 'Invalid token'}), 403
#         return func(*args, **kwargs)
#     return decorated


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header[7:]
        else:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # data = decode_token(token, app.config['SECRET_KEY'])
            verify_jwt_in_request()
            current_user = get_jwt_identity()
        except ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 403
        except InvalidTokenError as e:
            return jsonify({'message': 'Invalid token'}), 403
        
        return func(*args, **kwargs)
    return decorated


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"message": "Invalid request"}), 400
    
    username = data.get('username')
    password = data.get('password')
    
    if User.authenticate(username, password):
        # token = token_expiration(username)
        user_id = User.get_id(username)
        access_token = create_access_token(identity=user_id)
        refresh_token = create_refresh_token(identity=user_id)
        
        return jsonify({'message': 'Login successful',
                        'token': {
                                "access" : access_token, 
                                "refresh" : refresh_token
                                }
                        }), 200
                       
    else:
        return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication Failed"'})


@app.route('/nadashboard', methods=['GET'])
@token_required
def go_to_dashboard():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/viewaccountdetails', methods=['GET'])
@token_required
def view_account():
    user_id = get_jwt_identity()
    current_user = User.get_details(user_id)
    return jsonify({
        'full_name' : current_user.full_name,
        'username' : current_user.username,
        'password' : current_user.password,
        'phone' : current_user.phone,
        'email' : current_user.email,
        'organisation' : current_user.organisation,
        'plan' : current_user.plan
        }), 200


@app.route('/updateaccountdetails', methods=['GET'])
@token_required
def update_account():
    user_id = get_jwt_identity()
    data = request.get_json()
    success = User.update_user(user_id, data.get('first_name'), data.get('last_name'), data.get('username'), data.get('password'), data.get('phone'), data.get('email'))
    # return jsonify(logged_in_as=user_id), 200 
    return jsonify(success), 200 


@app.route('/alerts', methods=['GET'])
@token_required
def go_to_alerts():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200 


@app.route('/loginhistory', methods=['GET'])
@token_required
def go_to_login_history():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/events', methods=['GET'])
@token_required
def go_to_events():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200 


@app.route('/feedback', methods=['GET'])
@token_required
def go_to_feedback():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200 

if __name__ == '__main__':
    app.run(debug=True)