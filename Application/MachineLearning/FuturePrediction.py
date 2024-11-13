from flask import Blueprint, request, jsonify
import pymysql
from models.alerts import Alerts
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

predict_bp = Blueprint('predict', __name__)

# ML-Based Analysis of Historical Patterns
model_path = os.path.join(os.getcwd(), 'MachineLearning', 'lstm_model.h5')
encoder_path = os.path.join(os.getcwd(), 'MachineLearning', 'one_hot_encoder.pkl')
scaler_path = os.path.join(os.getcwd(), 'MachineLearning', 'scaler.pkl')
class_label_path = os.path.join(os.getcwd(), 'MachineLearning', 'class_labels.pkl')

model = load_model(model_path)
encoder = joblib.load(encoder_path)
scaler = joblib.load(scaler_path)
class_labels = joblib.load(class_label_path)

def future_predict():
    features = get_features()
    data = pd.DataFrame(features)

    categorical_features = ['Protocol']
    encoded_categorical = encoder.transform(data[categorical_features])
    remaining_features = data[['Start time', 'Source Port', 'Destination Port']].values
    X = np.concatenate([remaining_features, encoded_categorical], axis=1)


    # Feature scaling (normalize data)S
    scaled_X = scaler.transform(X)

    # Prepare time series data for LSTM (you can define the number of timesteps)
    def create_dataset(X, time_steps=1):
        Xs = []
        for i in range(len(X) - time_steps):
            Xs.append(X[i:(i + time_steps)])
        return np.array(Xs)

    # Set the number of time steps (e.g., look back 10 timesteps to predict the next)
    time_steps = 25

    X = create_dataset(scaled_X, time_steps)

    predictions = model.predict(X)

    # Convert predictions to indices by selecting the index of the highest probability
    predicted_indices = np.argmax(predictions, axis=1)
    confidence_levels = np.max(predictions, axis=1)

    # Use these indices to fetch the corresponding class labels
    label_prediction = [class_labels[idx] for idx in predicted_indices]

    result_list = [{'label': label_prediction[i], 'confidence': float(confidence_levels[i])} for i in range(len(label_prediction))]
    return result_list


# ML-Based Analysis of attack whether malicious or not
# modelV4_path = os.path.join(os.getcwd(), 'MachineLearning', 'ModelV6.h5')
# proto_encoder_path = os.path.join(os.getcwd(), 'MachineLearning', 'proto_encoder(3).joblib')
# scaler2_path = os.path.join(os.getcwd(), 'MachineLearning', 'scaler(3).pkl')

# modelV4 = load_model(modelV4_path)
# proto_encoder = joblib.load(proto_encoder_path)
# scaler2_encoder = joblib.load(scaler2_path)

# class_labels2 = ["safe", "attack"]

# def scan_attack(miscActivityData):
#     data = pd.DataFrame(miscActivityData)
#     print("DataFrame Columns:", data.columns)
#     print("Protocols in data:", data["proto"].unique())

#     data['src_addr'] = data['src_addr'].apply(lambda x: int(ipaddress.IPv4Address(x)))
#     data['dst_addr'] = data['dst_addr'].apply(lambda x: int(ipaddress.IPv4Address(x)))

#     data['proto'] = proto_encoder.transform(data["proto"])

#     data[['src_addr', 'dst_addr', 'proto']] = scaler2_encoder.transform(data[['src_addr', 'dst_addr', 'proto']])

#     # X = np.concatenate([encoded_proto], axis=1)

#     predictions = modelV4.predict(data)
#     predicted_indices = np.argmax(predictions, axis=1).tolist()
#     confidence_levels = np.max(predictions, axis=1)
    

#     # Use these indices to fetch the corresponding class labels
#     label_prediction = [class_labels2[idx] for idx in predicted_indices]

#     result_list = [{'label': label_prediction[i], 'confidence': float(confidence_levels[i])} for i in range(len(label_prediction))]
#     return result_list


    
def get_features():
    features = Alerts.get_features()
    # features2 = Alerts.get_features2()
    return features
