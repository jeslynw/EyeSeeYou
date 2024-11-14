from flask import Blueprint, request, jsonify, Response
import pymysql
from models.alerts import Alerts
import dbAccess as db
import time
import json
from flask_jwt_extended import get_jwt_identity
from auth_decorators import token_required

naalerts_bp = Blueprint('naalerts', __name__)

@naalerts_bp.route('/naalerts', methods=['GET'])
@token_required
def fetch_dashboard():
    current_user = get_jwt_identity()

    overview = alert_overview()
    top_threat_src = get_top_threat_src()
    top_threat_dest = get_top_threat_dest()
    trending_attacks = get_trending_attacks()
    recent_alerts = get_recent_alerts()
    critical_alerts = get_popup()
    

    list_top_threat_src = [{"source_address": alert[0], "count_source_address": alert[1]} for alert in top_threat_src]
    list_top_threat_dest = [{"dest_address": alert[0], "count_dest_address": alert[1]} for alert in top_threat_dest]
    list_trending_attacks = [{"class": row[0], "count": row[1]} for row in trending_attacks]
    list_recent_alerts = [
        {
            "id": alert["id"],
            "timestamp": alert["timestamp"],
            "src_addr": alert["src_addr"],
            "dst_addr": alert["dst_addr"],
            "class": alert["class"],
            "priority": alert["priority"],
            "status": alert["status"],
            "prediction": alert["prediction"],
        } 
        for alert in recent_alerts
    ]

    return jsonify({
        "logged_in_as": current_user,
        "top_threat_src": list_top_threat_src,
        "top_threat_dest": list_top_threat_dest,
        "trending_attacks": list_trending_attacks,
        "recent_alerts":list_recent_alerts,
        "alert_overview": overview,
        "critical_alerts":critical_alerts
    }), 200

def alert_overview():
    crit = Alerts.get_critical_priority()["critical_count"]
    high = Alerts.get_high_priority()["high_count"]
    med = Alerts.get_medium_priority()["medium_count"]
    low = Alerts.get_low_priority()["low_count"]

    # print(f"Critical: {crit}, High: {high}, Medium: {med}, Low: {low}")

    return {
        "critical" : crit,
        "high" : high,
        "med" : med,
        "low" : low
    }


def get_popup():
    alert = Alerts.get_popup_alert()
    return alert

def get_recent_alerts():
    alert = Alerts()
    alert_details = alert.get_search_alerts_details(priority='', class_='', src_addr='', dst_addr='', status='')
    return alert_details

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

@naalerts_bp.route('/naalerts/search', methods=['POST'])
@token_required
def get_search_alerts_details():
    alert = Alerts()
    try:
        data = request.json
        priority = data.get('priority')
        class_ = data.get('class')
        src_addr = data.get('src_addr')
        dst_addr = data.get('dst_addr')
        status = data.get('status')
        
        alert_details = alert.get_search_alerts_details(priority, class_, src_addr, dst_addr, status)
        return jsonify(alert_details)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@naalerts_bp.route('/naalerts/update_alert_status', methods=['POST'])
@token_required
def update_alert_status():
    try:
        data = request.json
        alertId = data.get('alertId')
        new_status = data.get('status')

        query = "UPDATE alerts SET status = %s WHERE id = %s"
        conn = db.get_connection()
        if not conn:
            raise Exception("Database connection failed")
        
        with conn.cursor() as cursor:
            cursor.execute(query, (new_status, alertId))
            conn.commit()
            
            if cursor.rowcount > 0:
                return jsonify({"message": "Alert status updated successfully"}), 200
            else:
                return jsonify({"error": "Alert not found or status unchanged"}), 404
    
    except Exception as e:
        print(f"Error: {e}")  # Log the error for debugging
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()