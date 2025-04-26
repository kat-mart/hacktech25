import './Home.css';
import { useState } from 'react';
import axios from 'axios';


export default function Home() {
   const [response, setResponse] = useState('');
   const [income, setIncome] = useState(null);
   const [expenses, setExpenses] = useState([{ amount: '', category: '' }]);


   const handleExpenseChange = (index, field, value) => {
       const updatedExpenses = [...expenses];
       updatedExpenses[index][field] = value;
       setExpenses(updatedExpenses);
   };


   const addExpense = () => {
       setExpenses([...expenses, { amount: '', category: '' }]);
   };


   const sendUserInput = () => {
       axios.post('http://127.0.0.1:5000/api/user-input', {
           income: income,
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


   return (
       <div>
           <h1 className="title">BUDGETNATOR</h1>
           <h2 className="title-description">Insert description</h2>
           <button className="start-button">Get Started</button>  


           <div className="input-container">
    <div className="input-box">
        <label className="income-label">Yearly Income: </label>
        <input
            type="number"
            value={income || ''}
            onChange={e => setIncome(Number(e.target.value))}
        />
        
        {expenses.map((expense, index) => (
            <div key={index} className="expense-input">
                <label className="amount-label">Amount: </label>
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
                    <option value="">Select a category </option>
                    <option value="food">Food </option>
                    <option value="transportation">Transportation </option>
                    <option value="entertainment">Entertainment </option>
                    <option value="utilities">Utilities </option>
                </select>
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


