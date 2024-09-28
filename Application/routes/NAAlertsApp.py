from flask import Blueprint, request, jsonify
import pymysql
from models.alerts import Alerts
import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

naalerts_bp = Blueprint('naalerts', __name__)

# top source ip address
@naalerts_bp.route('/naalerts', methods=['GET'])
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
    crit = Alerts.get_critical_priority()["critical_count"]
    high = Alerts.get_high_priority()["high_count"]
    med = Alerts.get_medium_priority()["medium_count"]
    low = Alerts.get_low_priority()["low_count"]

    print(f"Critical: {crit}, High: {high}, Medium: {med}, Low: {low}")

    return {
        "critical" : crit,
        "high" : high,
        "med" : med,
        "low" : low
    }
