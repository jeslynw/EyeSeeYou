from flask import Blueprint, request, jsonify
import pymysql
from models.alerts import Alerts
import dbAccess as db

from flask_jwt_extended import get_jwt_identity
from auth_decorators import token_required
import subprocess


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
                "priority": alert["priority"],
                "status": alert["status"],
                "prediction": alert["prediction"],
            } 
            for alert in recent_alerts
        ]
        return jsonify({
            "logged_in_as": current_user,
            "recent_alerts":list_recent_alerts,
            "alert_overview": overview
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


def get_recent_alerts():
    alert = Alerts()
    alert_details = alert.get_search_alerts_details(priority='', class_='', src_addr='', dst_addr='', status='')
    return alert_details



# def run_iptables_command(command):
#     try:
#         result = subprocess.run(
#             command,
#             capture_output=True,
#             text=True,
#             check=True
#         )
#         return True, result.stdout
#     except subprocess.CalledProcessError as e:
#         return False, e.stderr

# @nadashboard_bp.route('/nadashboard/block-ip', methods=['POST'])
# def block_ip():
#     data = request.json
#     ip_address = data.get('ip')
#     if not ip_address:
#         return jsonify({'error': 'IP address is required'}), 400

#     # Block incoming traffic
#     command = [
#         'sudo', 
#         'iptables', 
#         '-A', 
#         'INPUT', 
#         '-s', 
#         ip_address, 
#         '-j', 
#         'DROP'
#     ]
    
#     success, output = run_iptables_command(command)
#     if not success:
#         return jsonify({'error': f'Failed to block IP: {output}'}), 500
    
#     # Save rules
#     success, output = run_iptables_command(['sudo', 'iptables-save'])
#     if not success:
#         return jsonify({'error': f'Failed to save rules: {output}'}), 500

#     return jsonify({'message': f'IP {ip_address} blocked successfully'}), 200

# @nadashboard_bp.route('/nadashboard/unblock-ip', methods=['POST'])
# def unblock_ip():
#     data = request.json
#     ip_address = data.get('ip')
#     if not ip_address:
#         return jsonify({'error': 'IP address is required'}), 400

#     command = [
#         'sudo', 
#         'iptables', 
#         '-D',  # Delete rule
#         'INPUT', 
#         '-s', 
#         ip_address, 
#         '-j', 
#         'DROP'
#     ]
    
#     success, output = run_iptables_command(command)
#     if not success:
#         return jsonify({'error': f'Failed to unblock IP: {output}'}), 500
    
#     # Save rules
#     success, output = run_iptables_command(['sudo', 'iptables-save'])
#     if not success:
#         return jsonify({'error': f'Failed to save rules: {output}'}), 500

#     return jsonify({'message': f'IP {ip_address} unblocked successfully'}), 200

# @nadashboard_bp.route('/nadashboard/list-blocked-ips', methods=['GET'])
# def list_blocked_ips():
#     command = [
#         'sudo',
#         'iptables',
#         '-L',  # List rules
#         'INPUT',
#         '-n',  # Numeric output
#         '--line-numbers'  # Show line numbers
#     ]
    
#     success, output = run_iptables_command(command)
#     if not success:
#         return jsonify({'error': f'Failed to list rules: {output}'}), 500

#     return jsonify({'rules': output}), 200