import dbAccess as db
from MachineLearning.AttackPrediction import scan_attack

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


    # def get_features2():
        # query = """
        #         SELECT
        #             DATE_FORMAT(STR_TO_DATE(timestamp, '%%m/%%d-%%H:%%i:%%s.%%f'), '%%m/%%d %%H:%%i:%%s') AS formatted_timestamp,
        #             LOWER(protocol) AS protocol,
        #             src_addr,
        #             dst_addr,
        #             class, 
        #         CASE priority
        #                 WHEN 1 THEN 'Critical'
        #                 WHEN 2 THEN 'High'
        #                 WHEN 3 THEN 'Medium'
        #                 WHEN 4 THEN 'Low'
        #                 ELSE 'unknown'
        #             END AS priority, status
        #         FROM alerts
        #         WHERE `class` != "none"
        #         ORDER BY formatted_timestamp DESC
        #         """
        
        # conn = db.get_connection()
        # try:
        #     with conn.cursor() as cursor:
        #         cursor.execute(query)
        #         result = cursor.fetchall()
        #         if not result:
        #             print(f"No alerts found")
        #             return []
                
        #         feature = [
        #             {
        #                 'timestamp': row[0],
        #                 'proto': row[1],
        #                 'src_addr': row[2],
        #                 'dst_addr': row[3],
        #                 'class': row[4],
        #                 'priority': row[5],
        #                 'status': row[6]
        #             }
        #             for row in result
        #         ]                
        #         return feature
            
        #     miscActivityData = [row for row in feature if row['class'] == 'Misc activity']
            
        #     if miscActivityData:
        #         predictions = scan_attack(miscActivityData)

        #         # Merge predictions back into the misc activity entries
        #         for i, entry in enumerate(miscActivityData):
        #             entry['prediction'] = predictions[i]['label']
            
        #     # merge all data
        #     combined_data = feature
        #     for entry in miscActivityData:
        #         # replace old 'misc activity' entry with processed one
        #         for i, feature in enumerate(combined_data):
        #             if feature['class'] == 'Misc activity' and feature['timestamp'] == entry['timestamp']: #find the matching entry
        #                 combined_data[i] = entry
        #                 break

        #     return combined_data


        # except Exception as e:
        #     print(f"Get alert details error: {e}")
        #     return []
        # finally:
        #     if conn:
        #         conn.close()

    def get_alerts_details():
        query = """
                SELECT timestamp AS formatted_timestamp, src_addr, dst_addr, class, 
                CASE priority
                        WHEN 1 THEN 'Critical'
                        WHEN 2 THEN 'High'
                        WHEN 3 THEN 'Medium'
                        WHEN 4 THEN 'Low'
                        ELSE 'unknown'
                    END AS priority, status
                FROM alerts
                WHERE `class` != "none"
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

    def get_search_alerts_details(self, priority, class_, src_addr, dst_addr, status):
        query = """
                SELECT id, DATE_FORMAT(STR_TO_DATE(start_timestamp, '%%Y-%%m-%%d %%H:%%i:%%s'), '%%m/%%d %%H:%%i:%%s') as formatted_timestamp, LOWER(protocol) AS protocol, src_addr, dst_addr, class, 
                CASE priority
                        WHEN 1 THEN 'Critical'
                        WHEN 2 THEN 'High'
                        WHEN 3 THEN 'Medium'
                        WHEN 4 THEN 'Low'
                        ELSE 'unknown'
                    END AS priority, status, DATE_FORMAT(STR_TO_DATE(end_timestamp, '%%Y-%%m-%%d %%H:%%i:%%s'), '%%m/%%d %%H:%%i:%%s') as end_timestamp
                FROM alerts
                WHERE class != 'none'
                ORDER BY formatted_timestamp DESC
                LIMIT 50
            """
        
        params = []
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                result = cursor.fetchall()
                if not result:
                    print(f"No alerts found")
                    return []
                                
                feature = [
                    {
                        'id': row[0],
                        'timestamp': row[1],
                        'proto': row[2],
                        'src_addr': row[3],
                        'dst_addr': row[4],
                        'class': row[5],
                        'priority': row[6],
                        'status': row[7],
                        'end_timestamp': row[8],
                        'prediction': 'N/A'  # Default prediction value for all entries
                    }
                    for row in result
                ]           
                
                # Extracting data only for 'Misc activity' class to run ML predictions
                misc_indices = []  # Keep track of indices of Misc activity entries
                miscActivityData = []
                
                for idx, row in enumerate(feature):
                    if row['class'] == 'Misc activity':
                        misc_indices.append(idx)
                        miscActivityData.append({
                            'proto': row['proto'],
                            'src_addr': row['src_addr'],
                            'dst_addr': row['dst_addr']
                        })

                # Run ML model predictions if there's data to predict on
                if miscActivityData:
                    predictions = scan_attack(miscActivityData)
                    # print("predictions: ", predictions)

                    # Update only the prediction field, keeping the original class unchanged
                    for misc_idx, prediction in zip(misc_indices, predictions):
                        feature[misc_idx]['prediction'] = prediction['label']

                # Return all entries with predictions
                # print("\nfeature : ", feature)  

                return feature

        except Exception as e:
            print(f"Get alert details error: {e}")
            return []
        finally:
            if conn:
                conn.close()


    # def get_search_alerts_details(self, priority, class_, src_addr, dst_addr, status):
    #     query = """
    #             SELECT id, DATE_FORMAT(STR_TO_DATE(timestamp, '%%m/%%d-%%H:%%i:%%s.%%f'), '%%m/%%d %%H:%%i:%%s') AS formatted_timestamp, src_addr, dst_addr, class, 
    #             CASE priority
    #                     WHEN 1 THEN 'Critical'
    #                     WHEN 2 THEN 'High'
    #                     WHEN 3 THEN 'Medium'
    #                     WHEN 4 THEN 'Low'
    #                     ELSE 'unknown'
    #                 END AS priority, status
    #             FROM alerts
    #             WHERE `class` != "none"
    #         """
        
    #     # if user input exists in respective fields, add that statement to the query
    #     params = []
    #     conditions = []

    #     conn = db.get_connection()
    #     try:
    #         with conn.cursor() as cursor:
    #             cursor.execute(query, params)
    #             result = cursor.fetchall()
    #             if not result:
    #                 print(f"No alerts found")
    #                 return []
    #             alerts = [
    #                 {
    #                     'id': row[0],
    #                     'timestamp': row[1],
    #                     'src_addr': row[2],
    #                     'dst_addr': row[3],
    #                     'class': row[4],
    #                     'priority': row[5],
    #                     'status': row[6]
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

    def get_popup_alert():
        query = """
                SELECT class,   
                CASE priority
                    WHEN 1 THEN 'Critical'
                    WHEN 2 THEN 'High'
                END AS priority
                FROM alerts 
                where priority IN (1, 2)
                ORDER BY id DESC
                """
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
                if result is None:
                    print(f"No low alerts found")
                    return None
                
                notifications = [{
                    "class": result[0],
                    "critical": result[1]
                }]
                return notifications
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

    def get_features2():
        query = """
                SELECT
                    DATE_FORMAT(STR_TO_DATE(timestamp, '%%m/%%d-%%H:%%i:%%s.%%f'), '%%m/%%d %%H:%%i:%%s') AS formatted_timestamp,
                    LOWER(protocol) AS protocol,
                    src_addr,
                    dst_addr
                FROM alerts
                WHERE `class` != "none"
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
                
                feature = [
                    {
                        'proto': row[1],
                        'src_addr': row[2],
                        'dst_addr': row[3]
                    }
                    for row in result
                ]                
                return feature
                
        except Exception as e:
            print(f"Get alert details error: {e}")
            return []
        finally:
            if conn:
                conn.close()
