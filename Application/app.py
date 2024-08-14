from flask import Flask, request, jsonify
from Users import User

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if User.authenticate(username, password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Login failed"}), 401    

# if __name__ == '__main__':
#     app.run(debug=True)