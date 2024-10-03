import dbAccess as db

class Plan:
    def get_plan(plan_id):
        query = "SELECT * FROM plan WHERE plan_id = %s"
        values = (plan_id,)
        conn = db.get_connection()

        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                result = cursor.fetchone()
                if result:
                    return {
                        'profile_id': plan_id,
                        'plan_type': result[1]
                    }
                else:
                    return None
        except Exception as e:
            print(f"Get profile error: {e}")
            return None