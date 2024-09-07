import bcrypt
import dbAccess as db
# import logging

conn = db.get_connection()
app = db.app

class User:
    def __init__(self, id, first_name, last_name, username, password, phone, email, profile_id, active):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = password
        self.phone = phone
        self.email = email
        self.profile_id = profile_id
        self.active = active
        
    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.username} {self.password} {self.phone} {self.email} {self.profile_id} {self.active}"
    
    def __repr__(self):
        return f"{self.first_name} {self.last_name} {self.username} {self.password} {self.phone} {self.email} {self.profile_id} {self.active}"
    
    def get_id(self):
        return self.id
    
    def get_first_name(self):
        return self.first_name
    
    def get_last_name(self):
        return self.last_name
    
    def get_username(self):
        return self.username
    
    def get_password(self):
        return self.password
    
    def get_phone(self):
        return self.phone
    
    def get_email(self):
        return self.email
    
    def get_profile_id(self):
        return self.profile_id
    
    def get_active(self):
        return self.active
    
    def set_first_name(self, first_name):
        self.first_name = first_name
        
    def set_last_name(self, last_name):
        self.last_name = last_name
        
    def set_username(self, username):
        self.username = username
        
    def set_password(self, password):
        hash = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        self.password = hash.decode('utf-8')
        
    def set_phone(self, phone):
        self.phone = phone
        
    def set_email(self, email):
        self.email = email
        
    def set_active(self, active):
        self.active = active
        
    def to_dict(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'password': self.password,
            'phone': self.phone,
            'email': self.email,
            'profile_id': self.profile_id,
            'active': self.active
        }
        
    def from_dict(dict):
        return User(dict['first_name'], dict['last_name'], dict['username'], dict['password'], dict['phone'], dict['email'], dict['profile_id'], dict['active'])

    
    def authenticate(username, password):
        query = "SELECT password FROM user WHERE username = %s"
        values = (username,)
        
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result is None:
                    print(f"Authenticate: username={username}, no user found")
                    return False
                
                # Retrieve the stored hashed password
                stored_password = result[0]
                
                # Check if the provided password matches the stored hashed password
                if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
                    print(f"Authenticate: username={username}, login successful")
                    return True
                else:
                    print(f"Authenticate: username={username}, incorrect password")
                    return False
        except Exception as e:
            print.error(f"Authentication error: {e}")
            return False
    
    
    def get_id(username):
        query = "SELECT user_id FROM user WHERE username = %s"
        values = (username,)
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
    
    
    def get_details(user_id):
        query = "SELECT * FROM user WHERE user_id = %s"
        values = (user_id,)
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result is None:
                    print(f"Get details: username={user_id}, no user found")
                    return None
                return User(result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8])
        except Exception as e:
            print(f"Get details error: {e}")
            return None
    
    
    def update_user(self, user_id, first_name, last_name, username, password, phone, email):
        query = "UPDATE user SET first_name = %s, last_name = %s, username = %s, password = %s, phone = %s, email = %s WHERE user_id = %s"
        password = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt()).decode('utf-8')
        values = (first_name, last_name, username, password, phone, email, username, user_id)
        cursor = conn.cursor()
        
        try:
            cursor.execute(query, values)
            conn.commit()
            return True
        except:
            print("Error updating user")
            return False
        
