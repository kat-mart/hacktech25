from flask import Flask, jsonify
from flask_cors import CORS
from flask import request


app = Flask(__name__)
CORS(app)  # allow all origins by default
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.route('/api/user-input', methods=['POST'])
def receive_user_input():
   data = request.get_json()
   total_expenses =  0
   for expense in data['expenses']:
       total_expenses += int(expense['amount'])

   print(f"Total expenses: ${total_expenses}")
   total_savings_goal = total_expenses * 5
   income = data["income"]
   past_month_left = (income/12) - total_expenses
   past_week_left = past_month_left * 12 / 52
   willing_to_save = 0.5
   weekly_savings_goal = total_savings_goal / (willing_to_save * past_week_left)
   print(weekly_savings_goal)

   return jsonify(
      {"weeklyGoal": float(weekly_savings_goal), "totalGoal": float(total_savings_goal)}
   )


if __name__ == "__main__":
   app.run(debug=True)