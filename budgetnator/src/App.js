import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Resources from './components/Resources';
import ChatApp from './components/ChatApp';  // Import ChatApp
import axios from 'axios';
import AuthPage from './components/AuthPage';


const App = () => {
  const[loggedIn, setLoggedIn] = useState(false);
  
  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Resources' element={<Resources />} />
        <Route path='/ChatApp' element={<ChatApp />} /> 
        <Route path='/AuthPage' element={<AuthPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
