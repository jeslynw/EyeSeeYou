import bcrypt
import dbAccess as db
# import logging

conn = db.get_connection()
app = db.app

class User:
    def __init__(self, id, full_name, username, password, phone, email, organisation_name, profile_id, plan, active):
        self.id = id
        self.full_name = full_name
        self.username = username
        self.password = password
        self.phone = phone
        self.email = email
        self.organisation_name = organisation_name
        self.profile_id = profile_id
        self.plan = plan
        self.active = active
        
    def __str__(self):
        return f"{self.full_name} {self.username} {self.password} {self.phone} {self.email} {self.organisation_name} {self.profile_id} {self.plan} {self.active}"
    
    def __repr__(self):
        return f"{self.full_name} {self.username} {self.password} {self.phone} {self.email} {self.organisation_name} {self.profile_id} {self.plan} {self.active}"
    
    def get_id(self):
        return self.id
    
    def get_full_name(self):
        return self.full_name
    
    def get_username(self):
        return self.username
    
    def get_password(self):
        return self.password
    
    def get_phone(self):
        return self.phone
    
    def get_email(self):
        return self.email
    
    def get_organisation(self):
        return self.organisation
    
    def get_profile_id(self):
        return self.profile_id
<<<<<<< HEAD
        
    def get_active(self):
        return self.active
=======
>>>>>>> 52bf3ea299e3359c8a9fb4f4d02ba7851b79af10
    
    def get_plan(self):
        return self.plan
    
    def get_active(self):
        return self.active
    
    def set_full_name(self, full_name):
        self.full_name = full_name

    def set_username(self, username):
        self.username = username
        
    def set_password(self, password):
        hash = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        self.password = hash.decode('utf-8')
        
    def set_phone(self, phone):
        self.phone = phone
        
    def set_email(self, email):
        self.email = email
    
    def set_organisation_name(self, organisation_name):
        self.organisation_name = organisation_name

    def set_plan(self, plan):
        self.plan = plan
        
    def set_active(self, active):
        self.active = active
        
    def to_dict(self):
        return {
            'full_name': self.full_name,
            'username': self.username,
            'password': self.password,
            'phone': self.phone,
            'email': self.email,
            'organisation_name': self.organisation_name,
            'profile_id': self.profile_id,
            'plan': self.plan,
            'active': self.active
        }
        
    def from_dict(dict):
        return User(dict['full_name'], dict['username'], dict['password'], dict['phone'], dict['email'], dict['organisation_name'], dict['profile_id'],  dict['plan'], dict['active'])

    
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
        query = """
                SELECT u.user_id, u.full_name, u.username, u.password, u.phone, u.email, u.organisation_name, u.profile_id, u.plan_id, p.profile_name
                FROM user u
                JOIN user_profile p ON u.profile_id = p.profile_id
                WHERE u.user_id = %s
                """
                
        values = (user_id,)
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
                        'profile_name': result[9]
                }
        except Exception as e:
            print(f"Get details error: {e}")
            return None
    
    
    def update_user(self, user_id, full_name, username, password, phone, email):
        query = "UPDATE user SET first_name = %s, last_name = %s, username = %s, password = %s, phone = %s, email = %s WHERE user_id = %s"
        password = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt()).decode('utf-8')
        values = (full_name, username, password, phone, email, username, user_id)
        cursor = conn.cursor()
        
        try:
            cursor.execute(query, values)
            conn.commit()
            return True
        except:
            print("Error updating user")
            return False
        
