from flask import Blueprint, request, jsonify
import dbAccess as db
from models.feedback import Feedback

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
    return Feedback.submit_feedback(data['user_id'], data['rating'], data['review'])