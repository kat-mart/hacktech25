import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';  // Import signOut
import { auth } from './firebase';        // Import auth from firebase.js

export default function Navbar({ loggedIn, setLoggedIn }) {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);  // Sign out from Firebase
            setLoggedIn(false);   // Update loggedIn state
            navigate('/');        // Redirect to the home page or login page
        } catch (error) {
            console.error('Error signing out: ', error);  // Handle any sign out errors
        }
    };

    return (
        <nav className="nav">
            <div className="header">
            </div>
            <ul>
                <li>
                    <Link to='/Home'>Main</Link>
                </li>
                <li>
                    <Link to='/Resources'>Resources</Link>
                </li>
                <li>
                    <Link to='/ChatApp'>Gemini</Link>
                </li>
                {loggedIn ? (
                    <li>
                        <button className="signout-button" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to="/AuthPage">Log In</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
