from flask import request, jsonify
from functools import wraps
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, JWTManager, decode_token, verify_jwt_in_request
from flask_jwt_extended.exceptions import JWTDecodeError
from jwt import ExpiredSignatureError, InvalidTokenError

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