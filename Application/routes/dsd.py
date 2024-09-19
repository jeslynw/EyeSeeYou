from flask import Blueprint, request, jsonify
import pymysql
import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

nadashboard_bp = Blueprint('nadashboard', __name__)

# top source ip address
@nadashboard_bp.route('/nadashboard', methods=['GET'])
@token_required
def getTopThreatSrcAndDest():
    if request.method == 'GET':
        current_user = get_jwt_identity()
    
        top_threat_src = get_top_threat_src()
        top_threat_dest = get_top_threat_dest()
        trending_attacks = get_trending_attacks()

        list_top_threat_src = [{"source_address": alert[0], "count_source_address": alert[1]} for alert in top_threat_src]
        list_top_threat_dest = [{"dest_address": alert[0], "count_dest_address": alert[1]} for alert in top_threat_dest]
        list_trending_attacks = [{"class": row[0], "count": row[1]} for row in trending_attacks]

        return jsonify({
            "logged_in_as": current_user,
            "top_threat_src": list_top_threat_src,
            "top_threat_dest": list_top_threat_dest,
            "trending_attacks": list_trending_attacks
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

def get_top_threat_src():
    query = """SELECT src_addr, COUNT(src_addr)
                FROM alerts
                WHERE src_port IS NOT NULL
                GROUP BY src_addr
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

def get_top_threat_dest():
    query = """SELECT dst_addr, COUNT(dst_addr)
                FROM alerts
                WHERE src_port IS NOT NULL
                GROUP BY dst_addr
                ORDER BY COUNT(dst_addr) DESC
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