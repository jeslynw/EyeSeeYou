import dbAccess as db

class Alerts:
    def get_all_alerts():
        query = "SELECT COUNT(*) as total_count FROM alerts"
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchone()
                if result is None:
                    print(f"No alerts found")
                    return None
                return {
                    'total_count' : result[0]
                }
        except Exception as e:
            print(f"Get total count error: {e}")
            return None
        finally:
            if conn:
                conn.close()
    
    def get_critical_priority():
        query = "SELECT COUNT(*) as critical_count FROM alerts where priority = 1"
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchone()
                if result is None:
                    print(f"No critical alerts found")
                    return None
                return {
                    'critical_count' : result[0]
                }
        except Exception as e:
            print(f"Get critical count error: {e}")
            return None
        finally:
            if conn:
                conn.close()

    def get_high_priority():
        query = "SELECT COUNT(*) as high_count FROM alerts where priority = 2"
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchone()
                if result is None:
                    print(f"No high alerts found")
                    return None
                return {
                    'high_count' : result[0]
                }
        except Exception as e:
            print(f"Get high count error: {e}")
            return None
        finally:
            if conn:
                conn.close()
    
    def get_medium_priority():
        query = "SELECT COUNT(*) as medium_count FROM alerts where priority = 3"
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchone()
                if result is None:
                    print(f"No medium alerts found")
                    return None
                return {
                    'medium_count' : result[0]
                }
        except Exception as e:
            print(f"Get medium count error: {e}")
            return None
        finally:
            if conn:
                conn.close()
    
    def get_low_priority():
        query = "SELECT COUNT(*) as low_count FROM alerts where priority = 4"
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchone()
                if result is None:
                    print(f"No low alerts found")
                    return None
                return {
                    'low_count' : result[0]
                }
        except Exception as e:
            print(f"Get low count error: {e}")
            return None
        finally:
            if conn:
                conn.close()

    def get_alerts_details():
        query = """
                SELECT DATE_FORMAT(STR_TO_DATE(timestamp, '%m/%d-%H:%i:%s.%f'), '%m/%d %H:%i:%s') AS formatted_timestamp, src_addr, dst_addr, class, 
                CASE priority
                        WHEN 1 THEN 'Critical'
                        WHEN 2 THEN 'High'
                        WHEN 3 THEN 'Medium'
                        WHEN 4 THEN 'Low'
                        ELSE 'unknown'
                    END AS priority, status
                FROM alerts
                WHERE class != "none"
                ORDER BY formatted_timestamp DESC
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
                        'src_addr': row[1],
                        'dst_addr': row[2],
                        'class': row[3],
                        'priority': row[4],
                        'status': row[5]
                    }
                    for row in result
                ]
                return alerts
        except Exception as e:
            print(f"Get alert details error: {e}")
            return []
        finally:
            if conn:
                conn.close()