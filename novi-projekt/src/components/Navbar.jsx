import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Workshops</Link></li>
                <li><Link to="/instructors">Instructors</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
