import dbAccess as db

class Feedback:
    def submit_feedback(user_id, rating, review):
        query = "INSERT INTO feedback (user_id, rating, review) VALUES (%s, %s, %s)"
        values = (user_id, rating, review)
        conn = db.get_connection()

        try:
            with conn.cursor() as cursor:
                cursor.execute(query, values)
                conn.commit()
                return True
        except Exception as e:
            print(f"Error submitting feedback: {e}")
            return False

    @staticmethod
    def get_feedback():
        query = """
        SELECT rating, review 
        FROM feedback 
        """
        conn = db.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
                if result is None:
                    print(f"No feedback found")
                    return None
                
                feedbacks = [{
                    "rating": row[0],
                    "review": row[1]
                } for row in result
                ]
                return feedbacks
        except Exception as e:
            print(f"Get feedback error: {e}")
            return None
