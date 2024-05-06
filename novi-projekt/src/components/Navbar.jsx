import React from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../UserRoleContext'; // Ensure this import is correct

function Navbar() {
    const { role, toggleRole } = useRole(); // Using useContext to access role and toggleRole

    return (
        <nav>
            <ul>
                <li><Link to="/">Workshops</Link></li>
                <li><Link to="/instructors">Instructors</Link></li>
                <li>
                    <label>
                        Admin:
                        <input
                            type="checkbox"
                            checked={role === 'admin'}
                            onChange={toggleRole}
                        />
                    </label>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
