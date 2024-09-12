import pymysql
from flask import Flask, jsonify

app = Flask(__name__)

def get_connection():
    try:
        conn = pymysql.connect(host = 'localhost', user = "root", password = "", db = "eyeseeyou")
        return conn
    except pymysql.MySQLError as e:
        print(f"Error connecting to Server: {e}")

@app.route('/data', methods=['GET'])
def get_data():
    
    query = "SELECT * FROM user"
    
    conn = get_connection()
    cursor = conn.cursor()
    try:    
        cursor.execute(query)
        data = cursor.fetchall()
    except pymysql.connect.Error as err:
        print(err)
        return jsonify({"error": "Error in fetching data"})
    finally:
        cursor.close()
        conn.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)