import './Home.css';
import { useState, useRef } from 'react';
import axios from 'axios';


export default function Home() {
  const [emergencyFundGoal, setEmergencyFundGoal] = useState(null);
  const [personalGoal, setPersonalGoal] = useState(null);
  const [pieChart, sectPieChart] = useState(null);
  const [income, setIncome] = useState(null);
  const [expenses, setExpenses] = useState([{ amount: '', category: '', customCategory: '' }]);
  const [goal, setGoal] = useState(null);
  const [goalPercent, setGoalPercent] = useState(''); // State to store the personal goal percentage


  const inputContainerRef = useRef(null); // Create a ref for the input container


  const handleExpenseChange = (index, field, value) => {
      const updatedExpenses = [...expenses];
      updatedExpenses[index][field] = value;
      setExpenses(updatedExpenses);
  };


  const addExpense = () => {
      setExpenses([...expenses, { amount: '', category: '', customCategory: '' }]);
  };


  const sendUserInput = () => {
   // Call Emergency Fund API
   axios.post('http://127.0.0.1:5000/api/emergency_fund', {
       income: income,
       goal: goal,
       expenses: expenses,
       goalPercent: goalPercent,
   })
   .then(res => {
       setEmergencyFundGoal(res.data);
       console.log('Response from emergency fund server:', res.data);
   })
   .catch(error => {
       console.error('Error sending message to emergency fund:', error);
   });


   // Call Personal Goal API
   axios.post('http://127.0.0.1:5000/api/personal-goal', {
       income: income,
       goal: goal,
       expenses: expenses,
       goalPercent: goalPercent,
       personalGoal: personalGoal,
   })
   .then(res => {
       setPersonalGoal(res.data);
       console.log('Response from personal goal server:', res.data);
   })
   .catch(error => {
       console.error('Error sending message to personal goal:', error);
   });


   // Call Pie Chart API
   axios.post('http://127.0.0.1:5000/api/generate_pie_chart', {
       income: income,
       goal: goal,
       expenses: expenses,
       goalPercent: goalPercent,
       personalGoal: personalGoal,
   })
   .then(res => {
       sectPieChart(res.data);
       console.log('Response from pie chart server:', res.data);
   })
   .catch(error => {
       console.error('Error sending message to pie chart:', error);
   });


};




  const scrollToInputContainer = () => {
      inputContainerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Scrolls to the top of the section
      });
  };


  return (
      <div>
          {/* Input Container */}
          <div className="input-container" ref={inputContainerRef}>
              <div className="input-box">
                  <label className="income-label">Yearly Income: </label>
                  <input
                      type="number"
                      value={income || ''}
                      onChange={e => setIncome(Number(e.target.value))}
                  />
                  <label className="goal-label">Long-Term Goal: </label>
                   <input
                      type="number"
                      value={goal || ''}
                      onChange={e => setGoal(Number(e.target.value))}
                  />


                  {/* New dropdown for Personal Goal Percentage */}
                  <label className="personal-goal-label">Percent to save to personal goal: </label>
                  <select
                      value={goalPercent}
                      onChange={e => setGoalPercent(e.target.value)}
                  >
                      <option value="">Select a percentage</option>
                      <option value="25">25%</option>
                      <option value="50">50%</option>
                      <option value="75">75%</option>
                      <option value="100">100%</option>
                  </select>


                  {expenses.map((expense, index) => (
                      <div key={index} className="expense-input">
                          <label className="amount-label">Expense: </label>
                          <input
                              type="number"
                              value={expense.amount}
                              onChange={e => handleExpenseChange(index, 'amount', e.target.value)}
                          />
                          <label className="category-label">Category: </label>
                          <select
                              value={expense.category}
                              onChange={e => handleExpenseChange(index, 'category', e.target.value)}
                          >
                              <option value="">Select a category</option>
                              <option value="food">Food</option>
                              <option value="transportation">Transportation</option>
                              <option value="entertainment">Entertainment</option>
                              <option value="utilities">Utilities</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="housing">Housing</option>
                              <option value="education">Education</option>
                              <option value="clothing">Clothing</option>
                              <option value="other">Other</option>
                          </select>


                          {/* Show the custom category input if "Other" is selected */}
                          {expense.category === 'other' && (
                              <div>
                                  <label className="custom-category-label">Custom Category: </label>
                                  <input
                                      type="text"
                                      value={expense.customCategory}
                                      onChange={e => handleExpenseChange(index, 'customCategory', e.target.value)}
                                      placeholder="Enter custom category"
                                  />
                              </div>
                          )}
                      </div>
                  ))}


                  {/* Buttons outside of the expense mapping */}
                  <button className="add-button" onClick={addExpense}>Add Expense</button>
                  <button className="submit-button" onClick={sendUserInput}>Submit</button>


                  {emergencyFundGoal && (<>
                   <h2>Emergency Funds Goal</h2>
                   <p>Weeks to Reach Goal: {emergencyFundGoal.weeklyGoal}</p>
                   <p>Recommended Savings Goal: ${emergencyFundGoal.totalGoal}</p>
                   </>
                   )}


                   {personalGoal && (<>
                   <h2>Personal Goal</h2>
                   <p>Weeks to Reach Goal: {personalGoal.weeklyGoal}</p>
                   <p>Total Savings Goal: ${personalGoal.totalGoal}</p>
                   </>
                   )}


                   {pieChart && (<>
                   <h2>Pie Chart</h2>
                   <img src={pieChart.plot_url} alt="Pie Chart" />
                   </>
                   )}






              </div>
          </div>
      </div>
  );
}



