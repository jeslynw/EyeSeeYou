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

    # def get_alerts_details():
    #     query = """
    #             SELECT DATE_FORMAT(STR_TO_DATE(timestamp, '%m/%d-%H:%i:%s.%f'), '%m/%d %H:%i:%s') AS formatted_timestamp, src_addr, dst_addr, class, 
    #             CASE priority
    #                     WHEN 1 THEN 'Critical'
    #                     WHEN 2 THEN 'High'
    #                     WHEN 3 THEN 'Medium'
    #                     WHEN 4 THEN 'Low'
    #                     ELSE 'unknown'
    #                 END AS priority, status
    #             FROM alerts
    #             WHERE `class` != "none"
    #             ORDER BY formatted_timestamp DESC
    #             """
        
    #     conn = db.get_connection()
    #     try:
    #         with conn.cursor() as cursor:
    #             cursor.execute(query)
    #             result = cursor.fetchall()
    #             if not result:
    #                 print(f"No alerts found")
    #                 return []
    #             alerts = [
    #                 {
    #                     'timestamp': row[0],
    #                     'src_addr': row[1],
    #                     'dst_addr': row[2],
    #                     'class': row[3],
    #                     'priority': row[4],
    #                     'status': row[5]
    #                 }
    #                 for row in result
    #             ]
    #             return alerts
    #     except Exception as e:
    #         print(f"Get alert details error: {e}")
    #         return []
    #     finally:
    #         if conn:
    #             conn.close()

    def get_search_alerts_details(self, priority, class_, src_addr, dst_addr, status):
        query = """
                SELECT id, DATE_FORMAT(STR_TO_DATE(timestamp, '%%m/%%d-%%H:%%i:%%s.%%f'), '%%m/%%d %%H:%%i:%%s') AS formatted_timestamp, src_addr, dst_addr, class, 
                CASE priority
                        WHEN 1 THEN 'Critical'
                        WHEN 2 THEN 'High'
                        WHEN 3 THEN 'Medium'
                        WHEN 4 THEN 'Low'
                        ELSE 'unknown'
                    END AS priority, status
                FROM alerts
                WHERE `class` != "none"
            """
        
        # if user input exists in respective fields, add that statement to the query
        params = []
        conditions = []

        if priority:
            conditions.append("priority IN (%s)" % ', '.join(['%s'] * len(priority)))
            params.extend(priority)

        if class_:
            conditions.append("`class` LIKE %s")
            params.append(f"%{class_}%")

        if src_addr:
            conditions.append("src_addr LIKE %s")
            params.append(f"%{src_addr}%")

        if dst_addr:
            conditions.append("dst_addr LIKE %s")
            params.append(f"%{dst_addr}%")

        if status:
            conditions.append("status IN (%s)" % ', '.join(['%s'] * len(status)))
            params.extend(status)

        # Build the final query
        if conditions:
            query += " AND " + " AND ".join(conditions)
        query += " ORDER BY formatted_timestamp DESC"
            
        # for debugging: print the final query and parameters
        # print("Executing query:", query)
        # print("With parameters:", priority, class_, src_addr, dst_addr, status)

        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                result = cursor.fetchall()
                if not result:
                    print(f"No alerts found")
                    return []
                alerts = [
                    {
                        'id': row[0],
                        'timestamp': row[1],
                        'src_addr': row[2],
                        'dst_addr': row[3],
                        'class': row[4],
                        'priority': row[5],
                        'status': row[6]
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