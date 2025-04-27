from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import matplotlib
matplotlib.use('Agg')  # <-- tell matplotlib to use a non-GUI backend
import matplotlib.pyplot as plt
import io
import base64



app = Flask(__name__)
CORS(app)  # Allow all origins by default
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# emergency fund endpoint
@app.route('/api/emergency_fund', methods=['POST'])
def calculate_emergency_fund():
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
      {"weeklyGoal": round(weekly_savings_goal, 2), "totalGoal": round(total_savings_goal, 2)}
   )

# personal goal endpoint
@app.route('/api/personal-goal', methods=['POST'])
def calculate_personal_goal():
  data = request.get_json()
  total_expenses =  0
  for expense in data['expenses']:
      total_expenses += int(expense['amount'])

  print(f"Total expenses: ${total_expenses}")
  total_savings_goal = total_expenses * 5
  income = data["income"]
  past_month_left = (income/12) - total_expenses
  past_week_left = past_month_left * 12 / 52
  willing_to_save = float(data["goalPercent"]) / 100
  weekly_savings_goal = total_savings_goal / (willing_to_save * past_week_left)
  print(weekly_savings_goal)

  return jsonify({"weeklyGoal": round(weekly_savings_goal, 2), "totalGoal": round(total_savings_goal, 2)})


# pie chart endpoint
@app.route('/api/generate_pie_chart', methods=['POST'])
def generate_pie_chart():
    data = request.get_json()  #
    expenses = [expense["amount"] for expense in data["expenses"]]
    categories = [expense["category"] for expense in data["expenses"]]

    plt.figure(figsize=(8, 6))
    plt.pie(expenses, labels=categories, autopct='%1.1f%%', startangle=90)
    plt.title('Expense Breakdown')

    # Save the plot to a buffer
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)

    # Encode the image as base64 and add the correct data URL prefix
    plot_base64 = base64.b64encode(img.getvalue()).decode()
    plot_url = f"data:image/png;base64,{plot_base64}"

    # Close the plot so it doesn't keep stacking up in memory
    plt.close()

    return jsonify({"plot_url": plot_url})


if __name__ == '__main__':
    app.run(debug=True)

