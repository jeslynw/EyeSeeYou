from flask import Blueprint, request, jsonify
import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

viewloginhistory_bp = Blueprint('viewloginhistory', __name__)

@viewloginhistory_bp.route('/loginhistory', methods=['GET'])
@token_required
def viewLoginHistory():
    query = """SELECT u.user_id, lh.timestamp, lh.status
                    FROM login_history lh
                    JOIN user u ON lh.user_id = u.user_id
                    ORDER BY lh.timestamp DESC"""
            
    conn = db.get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()

            login_history = [
                {'username': row[0], 'timestamp': row[1], 'status': row[2]}
                for row in result
            ]
            
            return jsonify(login_history)
    except Exception as e:
        print(f"View login history error: {e}")
        return []
    finally:
        if conn:
            conn.close()