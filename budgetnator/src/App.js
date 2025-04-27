import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import About from './components/About';
import ChatApp from './components/ChatApp';  // Import ChatApp
import axios from 'axios';

import AuthPage from './components/AuthPage';


const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/ChatApp' element={<ChatApp />} /> 
        <Route path='/AuthPage' element={<AuthPage />} /> 
      </Routes>
    </div>
  );
}

export default App;
