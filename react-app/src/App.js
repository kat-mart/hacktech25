import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import axios from 'axios';


const App = () => {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/user') // API endpoint from Flask
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const sendMessage = () => {
    axios.post('http://127.0.0.1:5000/api/message', { message: "button clicked" })
      .then(res => {
        setResponse(res.data.response);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/About' element={<About />} />
      </Routes>
      {/* {data ? <p>{data.name} {data.age}</p> : <p>Loading...</p>}
      <button onClick={sendMessage}>Send Message</button>
      {response && <p>{response}</p>} */}
    </div>
  );
}

export default App;