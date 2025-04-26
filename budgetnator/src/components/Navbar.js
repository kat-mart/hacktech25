import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="nav">
            <div class="header">
            </div>
            <ul>
                <li>
                    <Link to='/Home'>Home</Link>
                </li>
                <li>
                    <Link to='/About'>About</Link>
                </li>
            </ul>
        </nav>
    );
};


