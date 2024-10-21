# testing can delete this later

from flask import Blueprint, request, jsonify
import pymysql
from models.alerts import Alerts
import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

t_alerts_bp = Blueprint('check-critical-alerts', __name__)

@app.route('/check-critical-alerts', methods=['GET'])
@token_required
def check_critical_alerts():
    current_user = get_jwt_identity()
    
    query = """
        SELECT class, timestamp 
        FROM alerts 
        WHERE severity = 'Medium' 
        AND timestamp > NOW() - INTERVAL 5 SECOND
        ORDER BY timestamp DESC
    """
    
    conn = db.get_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(query)
        alerts = cursor.fetchall()
        critical_alerts = [
            {
                "class": alert[0],
                "timestamp": alert[1].strftime("%Y-%m-%d %H:%M:%S")
            }
            for alert in alerts
        ]
        
        return jsonify({
            "criticalAlerts": critical_alerts
        }), 200
        
    except Exception as e:
        print(f"Error fetching critical alerts: {e}")
        return jsonify({"error": "Internal server error"}), 500
        
    finally:
        cursor.close()
        conn.close()