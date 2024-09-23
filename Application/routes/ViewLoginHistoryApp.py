from flask import Blueprint, request, jsonify
import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

viewloginhistory_bp = Blueprint('viewloginhistory', __name__)

@viewloginhistory_bp.route('/loginhistory', methods=['GET'])
@token_required
def viewLoginHistory():
    if request.method == 'GET':
        query = """SELECT * 
                    FROM login_history
                    ORDER BY timestamp DESC"""
            
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
                if result is None:
                    print(f"No history")
                    return None
                
                return {
                    'username': result[0],
                    'timestamp': result[1],
                    'status': result[2]
                }
        except Exception as e:
            print(f"View login history error: {e}")
            return []
        finally:
            if conn:
                conn.close()
        
