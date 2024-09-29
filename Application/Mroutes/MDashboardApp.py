from flask import Blueprint, request, jsonify
import pymysql
from models.alerts import Alerts

import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

m_dashboard_bp = Blueprint('mdashboard', __name__)

# top source ip address
@m_dashboard_bp.route('/mdashboard', methods=['GET'])
@token_required
def fetch_dashboard():
    if request.method == 'GET':
        current_user = get_jwt_identity()
    
        overview = alert_overview()

        return jsonify({
            "logged_in_as": current_user,
            "alert_overview": overview
        }), 200
    
def alert_overview():
    a = Alerts()
    total_alerts = a.get_all_alerts()
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


    # print(f"Total alerts: {total_alerts}")

    # return {
    #     "total_alerts" : total_alerts
    # }
