import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
   const navigate = useNavigate();

   const handleGetStartedClick = () => {
       navigate('/AuthPage'); // redirect to the AuthPage
   };

   return (
       <div>
           <h1 className="title">BUDGETNATOR</h1>
           <div className='description-container'>
                <h2 className="description">With the goal of bridging accessibility to financial support, Budgetnator is a platform where users can gain valuable insights into their expenses, a personalized timeframe for reaching goals for saving, and tailored investment strategy advice from our AI-powered advisor.</h2>
            </div>
           <button className="start-button" onClick={handleGetStartedClick}>
               Get Started
           </button>
       </div>
   );
}