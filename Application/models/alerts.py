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
                SELECT id, DATE_FORMAT(STR_TO_DATE(start_timestamp, '%%m/%%d-%%H:%%i:%%s.%%f'), '%%m/%%d %%H:%%i:%%s') AS formatted_timestamp, src_addr, dst_addr, class, 
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

    def get_critical_alert():
        query = """
                SELECT class
                CASE priority
                    WHEN 2 THEN 'Critical'
                    END AS priority
                FROM alerts 
                where priority = 2
                """
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchone()
                if result is None:
                    print(f"No low alerts found")
                    return None
                return {
                    'class' : result[0],
                    'critical': result[1]
                }
        except Exception as e:
            print(f"Get critical alert error: {e}")
            return None
        finally:
            if conn:
                conn.close()

    def get_top_src_dest_ip():
        query = '''
                SELECT src_addr, COUNT(src_addr) AS count_src_addr, dst_addr, COUNT(dst_addr) AS count_dst_addr
                FROM alerts
                WHERE NOT (src_addr LIKE '::%' OR src_addr LIKE 'f%')
                AND NOT (dst_addr LIKE '::%' OR dst_addr LIKE 'f%')
                GROUP BY src_addr, dst_addr
                LIMIT 3
                '''
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
                if result is None:
                    print(f"No source and destination ip address found")
                    return None
                
                formatted_results = []
                for row in result:
                    formatted_results.append({
                        'src_addr': row[0],
                        'count_src_addr': row[1],
                        'dst_addr': row[2],
                        'count_dst_addr': row[3]
                    })
                return formatted_results
        except Exception as e:
            print(f"Get critical alert error: {e}")
            return None
        finally:
            if conn:
                conn.close()

    def get_features():
    # First concat current year with timestamp to make it complete
        query = """
                SELECT UNIX_TIMESTAMP(
                        STR_TO_DATE(
                            CONCAT(YEAR(CURRENT_DATE()), '/', start_timestamp), 
                            '%Y/%m/%d-%H:%i:%s.%f'
                        )
                    ) AS unix_timestamp,
                    LOWER(protocol) AS protocol, 
                    src_port,
                    dst_port,
                    start_timestamp as original_timestamp  -- Keep original for verification
                FROM alerts
                WHERE `class` != "none" AND protocol != 'icmp'
                ORDER BY start_timestamp DESC
                LIMIT 26
                """
        
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
                if not result:
                    print(f"No alerts found")
                    return []
                
                feature = []
                for row in result:
                    unix_time = row[0]
                    # Handle case where timestamp might be from previous year
                    if unix_time is None:
                        # Try with previous year if current year fails
                        alternative_query = f"""
                            SELECT UNIX_TIMESTAMP(
                                STR_TO_DATE(
                                    CONCAT(YEAR(CURRENT_DATE()) - 1, '/', %s), 
                                    '%Y/%m/%d-%H:%i:%s.%f'
                                )
                            )
                            """
                        cursor.execute(alternative_query, (row[4],))
                        unix_time = cursor.fetchone()[0]
                    
                    feature.append({
                        'Start time': int(unix_time),
                        'Protocol': row[1],
                        'Source Port': row[2],
                        'Destination Port': row[3]
                    })
                
                return feature
                
        except Exception as e:
            print(f"Get alert details error: {e}")
            return []
        finally:
            if conn:
                conn.close()
