import pymysql

def get_connection():
<<<<<<< HEAD
    return pymysql.connect(host = 'localhost', user = "root", password = "your_password", db = "eyeseeyou")

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

if __name__ == 'main':
    app.run(debug=True)
=======
    return pymysql.connect(host = 'localhost', user = "root", password = "", db = "eyeseeyou")
>>>>>>> f58c82ec9b95a9a6e9b94e05cecfdd758cfd633f
