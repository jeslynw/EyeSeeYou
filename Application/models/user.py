import bcrypt
import dbAccess as db
from datetime import datetime

class User:
    def authenticate(username, password, otp):
        query = "SELECT password, otp FROM user WHERE username = %s"
        values = (username,)
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result is None:
                    print(f"Authenticate: username={username}, no user found")
                    return False
                
                #retrieve hashed password
                stored_password = result[0]
                stored_otp = result[1]
                
                #check if the provided password matches the stored hashed password
                if (bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8'))) and (bcrypt.checkpw(str(otp).encode('utf-8'), str(stored_otp).encode('utf-8'))):
                    print(f"Authenticate: username={username}, login successful")
                    User.log_login_attempt(username, 'Successful Login')
                    User.clear_otp(username)
                    return True
                else:
                    print(f"Authenticate: username={username}, incorrect password")
                    # print(f"entered: {str(otp).encode('utf-8')}")
                    # print(f"stored: {str(stored_otp).encode('utf-8')}")
                    User.log_login_attempt(username, 'Unsuccessful Login')
                    return False
        except Exception as e:
            print(f"Authentication error: {e}")
            User.log_login_attempt(username, 'Unsuccessful Login')
            return False
        finally:
            if conn:
                conn.close()

    def check_creds(username, password):
        query = "SELECT password FROM user WHERE username = %s"
        values = (username,)
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result is None:
                    print(f"Authenticate: username={username}, no user found")
                    return False
                
                #retrieve hashed password
                stored_password = result[0]
                
                #check if the provided password matches the stored hashed password
                if (bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8'))):
                    print(f"Authenticate: username={username}, login successful")
                    # User.log_login_attempt(username, 'Successful Login')
                    return True
                else:
                    print(f"Authenticate: username={username}, incorrect password")
                    User.log_login_attempt(username, 'Unsuccessful Login')
                    return False
        except Exception as e:
            print(f"Authentication error: {e}")
            User.log_login_attempt(username, 'Unsuccessful Login')
            return False
        finally:
            if conn:
                conn.close()
    
    
    def clear_otp(username):
        query = "UPDATE user SET otp = NULL WHERE user_id = %s"
        user_id = User.get_id(username)
        values = (user_id,)
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                conn.commit()
                return True
        except Exception as e:
            print(f"Get by username error: {e}")
            return False
        finally:
            if conn:
                conn.close()

    def get_id(username):
        query = "SELECT user_id FROM user WHERE username = %s"
        values = (username,)
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result is None:
                    print(f"Get by id: username={username}, no user found")
                    return None
                return result[0]
        except Exception as e:
            print(f"Get by id error: {e}")
            return None
        finally:
            if conn:
                conn.close()

    def get_email(username):
        query = "SELECT email FROM user WHERE username = %s"
        values = (username,)
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result is None:
                    print(f"Get by id: username={username}, no user found")
                    return None
                return result[0]
        except Exception as e:
            print(f"Get by id error: {e}")
            return None
        finally:
            if conn:
                conn.close()

    # Change OTP
    def update_otp(username, otp):
        hashed_otp = bcrypt.hashpw(str(otp).encode('utf-8'),bcrypt.gensalt())
        query = "UPDATE user SET otp = %s WHERE username = %s"
        values = (hashed_otp, username)
        conn = db.get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(query, values)
            conn.commit()
            return True
        except:
            print("Error updating user")
            return False
        finally:
            if conn:
                conn.close()



    def get_profile_id(username):
        query = "SELECT profile_id FROM user WHERE username = %s"
        values = (username,)
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result is None:
                    print(f"Get by id: username={username}, no user found")
                    return None
                return result[0]
        except Exception as e:
            print(f"Get by id error: {e}")
            return None
        finally:
            if conn:
                conn.close()

    # Change OTP
    def update_otp(username, otp):
        hashed_otp = bcrypt.hashpw(str(otp).encode('utf-8'),bcrypt.gensalt())
        query = "UPDATE user SET otp = %s WHERE username = %s"
        values = (hashed_otp, username)
        conn = db.get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(query, values)
            conn.commit()
            return True
        except:
            print("Error updating user")
            return False
        finally:
            if conn:
                conn.close()



    def get_profile_id(username):
        query = "SELECT user_id, profile_id FROM user WHERE username = %s"
        values = (username,)
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result is None:
                    print(f"Get by id: username={username}, no user found")
                    return None
                print(f"profile_id={result[1]}")
                return result[1]
        except Exception as e:
            print(f"Get by id error: {e}")
            return None
        finally:
            if conn:
                conn.close()

    
    def get_details(user_id):
        query = """
                SELECT u.user_id, u.full_name, u.username, u.password, u.phone, u.email, u.organisation_name, u.profile_id, u.plan_id, p.profile_name, pl.plan_type
                FROM user u
                JOIN user_profile p ON u.profile_id = p.profile_id
                JOIN plan pl ON u.plan_id = pl.plan_id
                WHERE u.user_id = %s
                """
                
        values = (user_id,)
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result is None:
                    print(f"Get details: username={user_id}, no user found")
                    return None
                
                # print(f"User found: {result}")  # Debugging output

                return {
                        'user_id': result[0],
                        'full_name': result[1],
                        'username': result[2],
                        'password': result[3],
                        'phone': result[4],
                        'email': result[5],
                        'organisation_name': result[6],
                        'profile_id': result[7],
                        'plan': result[8],
                        'profile_name': result[9],
                        'plan_type' : result[10]
                }
        except Exception as e:
            print(f"Get details error: {e}")
            return None
        finally:
            if conn:
                conn.close()
    
    
    def update_user(user_id, full_name, username, password, phone, email):
        if password == '':
            query = "UPDATE user SET full_name = %s, username = %s, phone = %s, email = %s WHERE user_id = %s"
            values = (full_name, username, phone, email, user_id)
        else:
            query = "UPDATE user SET full_name = %s, username = %s, password = %s, phone = %s, email = %s WHERE user_id = %s"
            password = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt()).decode('utf-8')
            values = (full_name, username, password, phone, email, user_id)
        
        conn = db.get_connection()
        cursor = conn.cursor()
        
        try:
            cursor.execute(query, values)
            conn.commit()
            return True
        except:
            print("Error updating user")
            return False
        finally:
            if conn:
                conn.close()

    def log_login_attempt(username, status):

        conn = db.get_connection()

        select_query = "SELECT user_id from user WHERE username = %s"
        select_values = (username,)

        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(select_query, select_values)
                result = cursor.fetchone()
                user_id = result[0]
                
                timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                
                # Insert the login attempt into the login_history table using user_id
                insert_query = "INSERT INTO login_history (user_id, timestamp, status) VALUES (%s, %s, %s)"
                insert_values = (user_id, timestamp, status)
                
                with conn.cursor() as cursor:
                    cursor.execute(insert_query, insert_values)
                    conn.commit()
                    
                print(f"Login attempt for user {username} (user_id: {user_id}) logged successfully.")
                
        except Exception as e:
            print(f"Error logging login attempt: {e}")
        finally:
            if conn:
                conn.close()