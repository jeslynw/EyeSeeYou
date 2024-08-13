import pymysql

def get_connection():
    return pymysql.connect(host = 'localhost', user = "root", password = "", db = "eyeseeyou")



# conn = pymysql.connect(host = 'localhost', user = "root", password = "", db = "eyeseeyou")

# cursor = conn.cursor()

# insert = "INSERT INTO user (username, password) VALUES ('test', 'testpassword')"

# cursor.execute(insert)
# conn.commit()
# conn.close()