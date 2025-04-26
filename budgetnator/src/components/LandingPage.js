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
           <h2 className="title-description">Insert description</h2>
           <button className="start-button" onClick={handleGetStartedClick}>
               Get Started
           </button>
       </div>
   );
}