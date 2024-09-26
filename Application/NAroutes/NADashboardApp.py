from flask import Blueprint, request, jsonify
import pymysql
from models.alerts import Alerts
import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

nadashboard_bp = Blueprint('nadashboard', __name__)

# top source ip address
@nadashboard_bp.route('/nadashboard', methods=['GET'])
@token_required
def fetch_dashboard():
    if request.method == 'GET':
        current_user = get_jwt_identity()
    
        overview = alert_overview()

        recent_alerts = get_recent_alerts()

        list_recent_alerts = [
            {
                "timestamp": alert["timestamp"],
                "src_addr": alert["src_addr"],
                "dst_addr": alert["dst_addr"],
                "class": alert["class"],
                "priority": alert["priority"]
            } 
            for alert in recent_alerts
        ]
        return jsonify({
            "logged_in_as": current_user,
            "recent_alerts":list_recent_alerts,
            "alert_overview": overview
        }), 200
    

def alert_overview():
    a = Alerts()
    crit = a.get_critical_priority()["critical_count"]
    high = a.get_high_priority()["high_count"]
    med = a.get_medium_priority()["medium_count"]
    low = a.get_low_priority()["low_count"]

    print(f"Critical: {crit}, High: {high}, Medium: {med}, Low: {low}")

    return {
        "critical" : crit,
        "high" : high,
        "med" : med,
        "low" : low
    }


def get_recent_alerts():
    alert = Alerts()
    alert_details = alert.get_alerts_details()
    return alert_details 