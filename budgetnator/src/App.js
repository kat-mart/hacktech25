import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import axios from 'axios';
import ChatApp from './components/ChatApp';
import AuthPage from './components/AuthPage';


const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/AuthPage' element={<AuthPage />} /> 
      </Routes>
    </div>
  );
}

export default App;