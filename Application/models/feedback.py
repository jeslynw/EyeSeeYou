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

    # @staticmethod
    # def get_feedback_by_id(feedback_id):
    #     query = "SELECT * FROM feedback WHERE id = %s"
    #     values = (feedback_id,)
    #     try:
    #         with conn.cursor() as cursor:
    #             cursor.execute(query, values)
    #             result = cursor.fetchone()
    #             if result is None:
    #                 print(f"Get by id: feedback_id={feedback_id}, no feedback found")
    #                 return None
    #             return Feedback(result[0], result[1], result[2], result[3])
    #     except Exception as e:
    #         print(f"Get by id error: {e}")
    #         return None

    # @staticmethod
    # def get_feedback_by_user(user_id):
    #     query = "SELECT * FROM feedback WHERE user_id = %s"
    #     values = (user_id,)
    #     try:
    #         with conn.cursor() as cursor:
    #             cursor.execute(query, values)
    #             results = cursor.fetchall()
    #             if not results:
    #                 print(f"Get by user: user_id={user_id}, no feedback found")
    #                 return []
    #             return [Feedback(result[0], result[1], result[2], result[3]) for result in results]
    #     except Exception as e:
    #         print(f"Get by user error: {e}")
    #         return []


