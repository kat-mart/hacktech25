import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [response, setResponse] = useState('');
    const [income, setIncome] = useState(null);
    const [amount, setAmount] = useState(null);

    const sendUserInput = () => { 
        axios.post('http://127.0.0.1:5000/api/user-input', { Income: income })
            .then(res => {
            setResponse(res.data.response);
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
                <label className="income-label">Yearly Income:</label>
                <input
                    type="number"
                    value={income}
                    onChange={e => setIncome(Number(e.target.value))}
                />

                <label className="amount-label">Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                />

                <button className="submit-button" onClick={sendUserInput}>Submit</button>
                {response && <p>{response}</p>}
            </div>
        </div>
    );
}