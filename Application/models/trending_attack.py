import dbAccess as db
import pymysql
from flask import jsonify

class TrendingAttacK:
    def trending_attacks():
        query = """SELECT class, COUNT(*) as count
                FROM alerts
                WHERE class NOT IN ('none')
                GROUP BY class"""

        conn = db.get_connection()
        cursor = conn.cursor()
        try:    
            cursor.execute(query)
            data = cursor.fetchall()
            return data
        except pymysql.connect.Error as err:
            print(err)
            return jsonify({"error": "Error in fetching data"})
        finally:
            cursor.close()
            conn.close()

    def limited_trending_attacks():
        query = """
                SELECT class, COUNT(*) as count
                FROM alerts
                WHERE class NOT IN ('none')
                GROUP BY class
                ORDER BY count DESC
                LIMIT 5
                """

        conn = db.get_connection()
        cursor = conn.cursor()
        try:    
            cursor.execute(query)
            data = cursor.fetchall()
            return data
        except pymysql.connect.Error as err:
            print(err)
            return jsonify({"error": "Error in fetching data"})
        finally:
            cursor.close()
            conn.close()