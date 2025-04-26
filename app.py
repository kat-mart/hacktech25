
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request


app = Flask(__name__)
CORS(app)  # allow all origins by default


@app.route('/api/user-input', methods=['POST'])
def receive_user_input():
   data = request.get_json()
   result = data['Income'] + 1000
   return jsonify({"response": result})


if __name__ == "__main__":
   app.run(debug=True)
