from flask import Blueprint, request, jsonify
import pymysql
# from models.alerts import Alerts
import dbAccess as db

from flask_jwt_extended import get_jwt_identity
from auth_decorators import token_required

natrendingattacks_bp = Blueprint('natrendingattacks', __name__)

# top source ip address
@natrendingattacks_bp.route('/natrendingattacks', methods=['GET'])
@token_required
def fetch_trending_attacks():
    if request.method == 'GET':
        current_user = get_jwt_identity()

        trending_attacks = get_trending_attacks()
        list_trending_attacks = [{"class": row[0], "count": row[1]} for row in trending_attacks]
        return jsonify({
            "logged_in_as": current_user,
            "trending_attacks": list_trending_attacks,
        }), 200
    

def get_trending_attacks():
    query = """SELECT class, COUNT(*) as count
               FROM alerts
               WHERE class NOT IN ('none')
               GROUP BY class"""

    conn = db.get_connection()
    cursor = conn.cursor()
    try:    
        cursor.execute(query)
        data = cursor.fetchall()
        return data
    except pymysql.connect.Error as err:
        print(err)
        return jsonify({"error": "Error in fetching data"})
    finally:
        cursor.close()
        conn.close()