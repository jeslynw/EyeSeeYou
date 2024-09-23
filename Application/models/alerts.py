import dbAccess as db

class Alerts:
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