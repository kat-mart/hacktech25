import './Home.css';
import { useState, useRef } from 'react';
import axios from 'axios';

export default function Home() {
   const [response, setResponse] = useState(null);
   const [income, setIncome] = useState(null);
   const [expenses, setExpenses] = useState([{ amount: '', category: '', customCategory: '' }]);
   const [goal, setGoal] = useState(null);

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
       axios.post('http://127.0.0.1:5000/api/user-input', {
           income: income,
           goal: goal,
           expenses: expenses,
       })
       .then(res => {
           setResponse(res.data.response);
           console.log(res.data);
       })
       .catch(error => {
           console.error('Error sending message:', error);
       });
   };

   const scrollToInputContainer = () => {
       inputContainerRef.current.scrollIntoView({
           behavior: 'smooth',
           block: 'start', 
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

                   {response && <p>{response}</p>}
               </div>
           </div>
       </div>
   );
}
