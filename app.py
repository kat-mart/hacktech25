
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request


app = Flask(__name__)
CORS(app)  # allow all origins by default


@app.route('/api/data', methods=['GET'])
def get_data():
   data = {"message": "Hello from Python!"}
   return jsonify(data)


@app.route('/api/user', methods=['GET'])
def get_user():
   user = {"name": "Alice", "age": 30}
   return jsonify(user)


@app.route('/api/message', methods=['POST'])
def receive_message():
   data = request.get_json()
   print("Received from frontend:", data)
   return jsonify({"response": "Hi!"})


if __name__ == "__main__":
   app.run(debug=True)
