import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import matplotlib
matplotlib.use('Agg')  # <-- tell matplotlib to use a non-GUI backend
import matplotlib.pyplot as plt
import io
import base64
from google import generativeai as genai


app = Flask(__name__)
CORS(app)  # allow all origins by default
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app = Flask(__name__)

# Allow all origins by default for general routes
CORS(app)

# Restrict specific routes
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/chat*": {"origins": "http://localhost:3000"}})

# Initialize GoogleGenAI with your API Key
API_KEY = os.getenv("GOOGLE_AI_API_KEY")

if not API_KEY:
    raise ValueError("GOOGLE_AI_API_KEY environment variable is not set")

# Configure the generativeai library with the API key
genai.configure(api_key=API_KEY)

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
        {"weeklyGoal": round(weekly_savings_goal, 2), "totalGoal": round(total_savings_goal, 2)}
    )

# Route to handle chat with Gemini AI
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')

    if not user_message:
        return jsonify({'response': 'Error: No message provided.'}), 400

    try:
        # Create a model instance
        model = genai.GenerativeModel('gemini-1.5-pro')
        
        # Generate content using the user's message
        response = model.generate_content(f"""
        You are a helpful financial advisor named Budgetnator. The user said: "{user_message}"
        Based on their message, help them set or reach financial goals with realistic and practical advice.
        Please keep answers short but informative.
        """)
        
        # Extract the text from the response
        ai_response = response.text
        
        return jsonify({'response': ai_response})
    except Exception as e:
        print(f"Error calling Gemini API: {str(e)}")


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