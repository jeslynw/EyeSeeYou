from flask import Blueprint, request, jsonify
import pymysql
import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/feedback', methods=['GET'])
@token_required
def go_to_feedback():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200 

@feedback_bp.route('/feedback', methods=['POST'])
@token_required
def saveRatingAndReview():
    data = request.json
    query = "INSERT INTO `feedback`(`user_id`, `rating`, `review`) VALUES (%s, %s, %s)"

    conn = db.get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(query, (data['user_id'], data['rating'], data['review']))
        conn.commit()
        return jsonify({"message": "Feedback submitted successfully"}), 201
    except pymysql.MySQLError as err:
        print(f"Database error: {err}")
        print(data['user_id'], data['rating'], data['review'])
        return jsonify({"error": "Error submitting feedback"}), 500
    finally:
        cursor.close()
        conn.close()

