import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRole } from '../UserRoleContext';

function AdminWorkshops() {
    const [workshops, setWorkshops] = useState([]);
    const { role } = useRole();

    useEffect(() => {
        axios.get('http://localhost:5000/radionice')
            .then(response => setWorkshops(response.data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {role === 'admin' && (
                <button onClick={() => {/* logic to show add/edit modal */}}>
                    Add/Edit Workshop
                </button>
            )}
            <ul>
                {workshops.map(workshop => (
                    <li key={workshop.id}>
                        {workshop.ime} - {workshop.opis}
                        {role === 'admin' && (
                            <button onClick={() => {/* logic to edit this workshop */}}>
                                Edit
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminWorkshops;
