import dbAccess as db

class Notification:
    def get_notification():
        query = """
                SELECT DATE_FORMAT(STR_TO_DATE(timestamp, '%m/%d-%H:%i:%s.%f'), '%m/%d %h:%i %p') AS timestamp,
                    class, 
                    'Critical' AS priority,
                    status
                FROM alerts
                WHERE class != 'none'
                AND alerts.id IN (SELECT alert_id FROM notification)
                """
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
                if not result:
                    print(f"No alerts found")
                    return []
                alerts = [
                    {
                        'timestamp': row[0],
                        'class': row[1],
                        'priority': row[2],
                        'status': row[3]
                    }
                    for row in result
                ]
                return alerts
        except Exception as e:
            print(f"Get notifications error: {e}")
            return []
        finally:
            if conn:
                conn.close()

    def send_alert():
        