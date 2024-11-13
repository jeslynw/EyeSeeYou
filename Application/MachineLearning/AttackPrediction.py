from flask import Blueprint, request, jsonify
import pymysql
import dbAccess as db
from flask_jwt_extended import get_jwt_identity
from auth_decorators import token_required

from datetime import datetime
import joblib
import numpy as np
import os
from tensorflow import keras
from tensorflow.keras.models import load_model
import sklearn
from sklearn.preprocessing import OneHotEncoder
import pandas as pd
import ipaddress

attack_predict_bp = Blueprint('attack_predict', __name__)

# ML-Based Analysis of attack whether malicious or not
modelV4_path = os.path.join(os.getcwd(), 'MachineLearning', 'ModelV6.h5')
proto_encoder_path = os.path.join(os.getcwd(), 'MachineLearning', 'proto_encoder(3).joblib')
scaler2_path = os.path.join(os.getcwd(), 'MachineLearning', 'scaler(3).pkl')

modelV4 = load_model(modelV4_path)
proto_encoder = joblib.load(proto_encoder_path)
scaler2_encoder = joblib.load(scaler2_path)

class_labels2 = ["SAFE", "ATTACK"]

def scan_attack(miscActivityData):
    data = pd.DataFrame(miscActivityData)
    print("DataFrame Columns:", data.columns)
    print("Protocols in data:", data["proto"].unique())

    data['src_addr'] = data['src_addr'].apply(lambda x: int(ipaddress.IPv4Address(x)))
    data['dst_addr'] = data['dst_addr'].apply(lambda x: int(ipaddress.IPv4Address(x)))

    data['proto'] = proto_encoder.transform(data["proto"])

    data[['src_addr', 'dst_addr', 'proto']] = scaler2_encoder.transform(data[['src_addr', 'dst_addr', 'proto']])

    # X = np.concatenate([encoded_proto], axis=1)

    predictions = modelV4.predict(data)
    predicted_indices = np.argmax(predictions, axis=1).tolist()
    confidence_levels = np.max(predictions, axis=1)
    

    # Use these indices to fetch the corresponding class labels
    label_prediction = [class_labels2[idx] for idx in predicted_indices]

    result_list = [{'label': label_prediction[i]} for i in range(len(label_prediction))]
    return result_list
