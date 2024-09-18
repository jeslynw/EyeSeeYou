from flask import Blueprint, request, jsonify
import pymysql
import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

nadashboard_bp = Blueprint('nadashboard', __name__)

@nadashboard_bp.route('/nadashboard', methods=['GET'])
@token_required
def viewDashboard():
    if request.method == 'GET':
        current_user = get_jwt_identity()
        alerts = getTopThreatSrcAndDest()

        topThreatSrcAndDest = []
        for alert in alerts:
            topThreatSrcAndDest.append({
                "source_address": alert[0],
                "destination_address": alert[1]
            })

        return jsonify({
            "logged_in_as": current_user,
            "trending_src_and_dest": topThreatSrcAndDest
        }), 200
    

def getTopThreatSrcAndDest():
    query = """SELECT src_addr, dst_addr, COUNT(src_addr), src_port
                FROM alerts
                WHERE src_port IS NOT NULL
                GROUP BY src_addr, dst_addr
                ORDER BY COUNT(src_addr) DESC
                LIMIT 5"""
    
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
    

# def getOtherStuff():
#     query = """SELECT src_addr, COUNT(src_addr), dst_addr, class as source_address, destination_address, classification
#                 FROM alerts
#                 GROUP BY src_addr, dst_addr, class
#                 ORDER BY count DESC
#                 LIMIT 5"""
    
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