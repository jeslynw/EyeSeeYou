from flask import Blueprint, request, jsonify
import pymysql
from models.trending_attack import TrendingAttacK
import dbAccess as db

from flask_jwt_extended import get_jwt_identity
from auth_decorators import token_required

from MachineLearning.FuturePrediction import future_predict

trendingattacks_bp = Blueprint('trendingattacks', __name__)

# top source ip address
@trendingattacks_bp.route('/trendingattacks', methods=['GET'])
@token_required
def fetch_trending_attacks():
    current_user = get_jwt_identity()

    trending_attacks = get_trending_attacks()
    future_prediction = future_predict()

    list_trending_attacks = [{"class": row[0], "count": row[1]} for row in trending_attacks]
    return jsonify({
        "logged_in_as": current_user,
        "trending_attacks": list_trending_attacks,
        "future_prediction": future_prediction
    }), 200
    

def get_trending_attacks():
    trend = TrendingAttacK.trending_attacks()
    return trend
