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

    print(f"Total alerts: {total_alerts}")

    return {
        "total_alerts" : total_alerts
    }
