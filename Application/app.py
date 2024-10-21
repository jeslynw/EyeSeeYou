from flask import Flask, make_response, request, jsonify
from functools import wraps
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, JWTManager, decode_token, verify_jwt_in_request
from flask_jwt_extended.exceptions import JWTDecodeError
from jwt import ExpiredSignatureError, InvalidTokenError
from flask_cors import CORS
import getKey as gk
from datetime import timedelta

# import file
from models.user import User
from models.user_profile import UserProfile

import dbAccess as db
import pymysql

from auth_decorators import token_required
from routes.FeedbackApp import feedback_bp

# NA Routes
from NAroutes.NADashboardApp import nadashboard_bp
from NAroutes.NAAlertsApp import naalerts_bp
from NAroutes.NATrendingAttacksApp import natrendingattacks_bp
from NAroutes.ViewLoginHistoryApp import viewloginhistory_bp

# M routes
from Mroutes.MDashboardApp import m_dashboard_bp
from Mroutes.MAlertsApp import m_alerts_bp
from Mroutes.MSummarisedPDFApp import m_summarisedpdf_bp

app = Flask(__name__)
jwt = JWTManager(app)
CORS(app, origins=['http://localhost:3000'])

# custom way to get tokens
def getkey():
    filename = 'api_secret.txt'
    return gk.get_key(filename, '=')

app.config['SECRET_KEY'] = getkey()

# def token_expiration(username):
#     return jwt.encode({'username': username, 'exp': str(datetime.now(timezone.utc) + timedelta(minutes=30))}, app.config['SECRET_KEY']


# debugging
# @app.route('/data', methods=['GET'])
# def get_data():
    
#     query = "SELECT * FROM user"
    
#     conn = db.get_connection()
#     cursor = conn.cursor()
#     try:    
#         cursor.execute(query)
#         data = cursor.fetchall()
#     except pymysql.connect.Error as err:
#         print(err)
#         return jsonify({"error": "Error in fetching data"})
#     finally:
#         cursor.close()
#         conn.close()
#     return jsonify(data)

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
        profile_id = User.get_profile_id(username)
        access_token = create_access_token(identity=user_id, expires_delta=timedelta(seconds=10))
        refresh_token = create_refresh_token(identity=user_id)
        print(access_token)
        return jsonify(
            {'message': 'Login successful',
            'token': {
                    "access" : access_token, 
                    "refresh" : refresh_token
                    },
            'profileId': profile_id
            }
        ), 200     
    else:
        return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication Failed"'})

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id, expires_delta=timedelta(seconds=20))
    refresh_token = create_refresh_token(identity=user_id)
    print(access_token)
    return jsonify(
        {"accesstoken": access_token,
         "refreshtoken": refresh_token}
        ), 200


@app.route('/viewaccountdetails', methods=['GET'])
@token_required
def view_account():
    user_id = get_jwt_identity()
    current_user = User.get_details(user_id)
    return jsonify({
        "logged_in_as": current_user['user_id'],
        'full_name': current_user['full_name'],
        'username': current_user['username'],
        'password': current_user['password'],
        'phone': current_user['phone'],
        'email': current_user['email'],
        'organisation_name': current_user['organisation_name'],
        'profile_id': current_user['profile_id'],
        'plan': current_user['plan'],
        'profile_name' : current_user['profile_name'],
        'plan_type' : current_user['plan_type']
    }), 200


@app.route('/updateaccountdetails', methods=['POST'])
@token_required
def update_account():
    user_id = get_jwt_identity()
    data = request.get_json()
    success = User.update_user(
        user_id, 
        data.get('full_name'), 
        data.get('username'), 
        data.get('password'), 
        data.get('phone'),
        data.get('email'))
    return jsonify(success), 200 


# @app.route('/loginhistory', methods=['GET'])
# @token_required
# def go_to_login_history():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200


app.register_blueprint(feedback_bp)
app.register_blueprint(nadashboard_bp)
app.register_blueprint(naalerts_bp)
app.register_blueprint(natrendingattacks_bp)
app.register_blueprint(m_dashboard_bp)
app.register_blueprint(m_summarisedpdf_bp)
app.register_blueprint(m_alerts_bp)
app.register_blueprint(viewloginhistory_bp)

if __name__ == '__main__':
    app.run(debug=True)