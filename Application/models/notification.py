import dbAccess as db

class Notification:
    def get_notification():
        #get id from notification
        select_query = "SELECT * FROM notification ORDER BY id DESC FOR UPDATE"

        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                conn.begin()

                cursor.execute(select_query)
                id_result = cursor.fetchall()

                if not id_result:
                    print(f"No notification")
                    return []

                to_retrieve = ()
                to_delete = ()

                for row in id_result:
                    to_retrieve += (row[1],)
                    to_delete += (row[0],)

                
                #get alert using id from notification
                select_query2 = f"SELECT start_timestamp, class, priority, src_addr FROM alerts WHERE id IN {to_retrieve}"

                cursor.execute(select_query2)
                alert_result = cursor.fetchall()
                
                #delete after retrieve
                delete_query = f"DELETE FROM notification WHERE id IN {to_delete}"

                cursor.execute(delete_query)
                conn.commit()                

                notification = [
                    {
                        'timestamp': row[0],
                        'class': row[1],
                        'priority': row[2],
                        'src_addr': row[3]
                    }
                    for row in alert_result
                ]
                return notification
        except Exception as e:
            print(f"Get notifications error: {e}")
            return []
        finally:
            if conn:
                conn.close()