import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRole } from '../UserRoleContext';

function AdminInstructors() {
    const [instructors, setInstructors] = useState([]);
    const { role } = useRole();

    useEffect(() => {
        axios.get('http://localhost:5000/predavaci')
            .then(response => setInstructors(response.data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {role === 'admin' && (
                <button onClick={() => {/* logic to show add/edit modal */}}>
                    Add/Edit Instructor
                </button>
            )}
            <ul>
                {instructors.map(instructor => (
                    <li key={instructor.id}>
                        {instructor.ime} - {instructor.biografija}
                        {role === 'admin' && (
                            <button onClick={() => {/* logic to edit this instructor */}}>
                                Edit
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminInstructors;
