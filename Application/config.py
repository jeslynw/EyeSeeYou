from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import getKey as gk
from flask_mail import Mail, Message

app = Flask(__name__)
jwt = JWTManager(app)
CORS(app, origins=['http://localhost:3000'])

app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = "eyeseeyoufyp@gmail.com"
app.config['MAIL_PASSWORD'] = "fxjv puoa tdul zzwm"
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

# custom way to get tokens
def getkey():
    filename = 'api_secret.txt'
    return gk.get_key(filename, '=')

app.config['SECRET_KEY'] = getkey()