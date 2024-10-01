import dbAccess as db

class UserProfile:
    def get_profile(profile_id):
        query = "SELECT * FROM user_profile WHERE profile_id = %s"
        values = (profile_id,)
        conn = db.get_connection()

        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result:
                    return {
                        'profile_id': profile_id,
                        'profile_name': result[1]
                    }
                else:
                    return None
        except Exception as e:
            print(f"Get profile error: {e}")
            return None
        
    