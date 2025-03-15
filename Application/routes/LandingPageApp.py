from flask import Blueprint, request, jsonify
import pymysql
from models.feedback import Feedback
import dbAccess as db

from flask_jwt_extended import get_jwt_identity

from auth_decorators import token_required

landingpage_bp = Blueprint('/', __name__)

@landingpage_bp.route('/', methods=['GET'])
def display_feedback():
    feedback = retrieve_feedback()
    return jsonify(feedback)


def retrieve_feedback():
    feedback = Feedback.get_feedback()
    return feedback