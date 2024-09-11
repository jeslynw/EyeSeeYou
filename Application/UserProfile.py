import bcrypt
import dbAccess as db
# import logging

conn = db.get_connection()
app = db.app

class UserProfile:
    def __init__(self, id, profile_name):
        self.id = id
        self.profile_name = profile_name

    def __str__(self):
        return f"{self.profile_name}"
    
    def __repr__(self):
        return f"{self.profile_name}"
    
    def get_id(self):
        return self.id
    
    def get_profile_name(self):
        return self.profile_name
    

    def get_profile(id):
        query = "SELECT * FROM user_profile WHERE profile_id = %s"
        values = (id,)
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result:
                    return {
                        'profile_id': result[0],
                        'profile_namee':result[1]
                    }
                else:
                    return None
        except Exception as e:
            print(f"Get profile error: {e}")
            return None
        
    