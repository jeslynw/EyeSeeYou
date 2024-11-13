from flask import Blueprint, request, jsonify, render_template_string
import json
import folium
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
        src_locations = get_geoip_list()
        map = create_heatmap(src_locations)
        

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
            "alert_overview": overview,
            "src_geo": src_locations,
            "map": map
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

def get_recent_alerts():
    alert = Alerts()
    alert_details = alert.get_search_alerts_details(priority='', class_='', src_addr='', dst_addr='', status='')
    return alert_details

def get_geoip_list():
    query = """SELECT DISTINCT geoip
                FROM alerts
                WHERE geoip IS NOT NULL
                AND geoip <> '{}'"""
    conn = db.get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()

            if not result:
                print("No geoip found")
                return None
            
            geoip_list = []
            for row in result:
                try:
                    geoip_data = json.loads(row[0])
                    
                    latitude = geoip_data.get('latitude')
                    longitude = geoip_data.get('longitude')
                    
                    if latitude is not None and longitude is not None:
                        geoip_list.append((latitude, longitude))
                
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON: {e}")
                    continue
            return geoip_list
    except Exception as e:
        print(f"Get geoip error: {e}")
        return None
    finally:
        if conn:
            conn.close()

def create_heatmap(locations):
    """Embed a map as an iframe on a page."""
    m = folium.Map(location=[locations[0][0], locations[0][1]], zoom_start=2)

    for lat, lon in locations:
        folium.Marker([lat, lon]).add_to(m)

    # set the iframe width and height
    m.get_root().width = "800px"
    m.get_root().height = "600px"
    iframe = m.get_root()._repr_html_()

    return iframe