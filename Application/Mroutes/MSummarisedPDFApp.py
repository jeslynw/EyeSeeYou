from flask import Blueprint, request, jsonify
import pymysql
import dbAccess as db
from flask_jwt_extended import get_jwt_identity
from auth_decorators import token_required

from models.alerts import Alerts
from models.trending_attack import TrendingAttacK

m_summarisedpdf_bp = Blueprint('summarisedpdf', __name__)

# top source ip address
@m_summarisedpdf_bp.route('/summarisedpdf', methods=['GET'])
@token_required
def fetch_data():
    current_user = get_jwt_identity()
    trending_attacks = get_trending_attacks()
    overview = alert_overview()
    countSrcAndDestIP = count_src_dest_ip()
    listCountSrcAndDestIP = [{"src_addr": row['src_addr'], "count_src_addr": row['count_src_addr'], 'dst_addr': row['dst_addr'], 'count_dst_addr': row['count_dst_addr']} for row in countSrcAndDestIP]
    list_trending_attacks = [{"class": row[0], "count": row[1]} for row in trending_attacks]

    return jsonify({
        "logged_in_as": current_user,
        "alert_overview": overview,
        "list_trending_attacks": list_trending_attacks,
        "countSrcAndDestIP": listCountSrcAndDestIP
    }), 200
    
def alert_overview():
    # total_alerts = Alerts.get_all_alerts()
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

def get_trending_attacks():
    trend = TrendingAttacK.trending_attacks()
    return trend

def count_src_dest_ip():
    count_ip = Alerts.get_top_src_dest_ip()
    return count_ip 
