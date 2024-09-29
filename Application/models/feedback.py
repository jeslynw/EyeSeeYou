import dbAccess as db
from flask import Blueprint, jsonify

conn = db.get_connection()

class Feedback:
    def __init__(self, feedback_id, user_id, rating, review):
        self.feedback_id = feedback_id
        self.user_id = user_id
        self.rating = rating
        self.review = review
        
    def __str__(self):
        return f"Feedback ID: {self.feedback_id}, User ID: {self.user_id}, Rating: {self.rating}, Review: {self.review}"
    
    def __repr__(self):
        return f"Feedback(ID={self.feedback_id}, User_ID={self.user_id}, Rating={self.rating}, Review={self.review})"
    
    def get_id(self):
        return self.feedback_id
    
    def get_user_id(self):
        return self.user_id
    
    def get_rating(self):
        return self.rating
    
    def get_review(self):
        return self.review
    
    def set_rating(self, rating):
        self.rating = rating
        
    def set_review(self, review):
        self.review = review
        
    def to_dict(self):
        return {
            'id': self.feedback_id,
            'user_id': self.user_id,
            'rating': self.rating,
            'review': self.review
        }
        
    @staticmethod
    def from_dict(data):
        return Feedback(data['feedback_id'], data['user_id'], data['rating'], data['review'])

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

    # @staticmethod
    # def submit_feedback(user_id, rating, review):
    #     query = "INSERT INTO feedback (user_id, rating, review) VALUES (%s, %s, %s)"
    #     values = (user_id, rating, review)
    #     conn = db.get_connection()

    #     try:
    #         with conn.cursor() as cursor:
    #             cursor.execute(query, values)
    #             conn.commit()
    #             return True
    #     except Exception as e:
    #         print(f"Error submitting feedback: {e}")
    #         return False
