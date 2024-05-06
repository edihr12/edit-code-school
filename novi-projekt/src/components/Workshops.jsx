import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRole } from '../UserRoleContext';
import AddEditWorkshopModal from './AddEditWorkshopModal'; // Modal for adding/editing workshops

function Workshops() {
    const [workshops, setWorkshops] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // To control the modal visibility
    const { role } = useRole(); // Access user role

    useEffect(() => {
        axios.get('http://localhost:5000/radionice')
            .then(response => {
                setWorkshops(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            {role === 'admin' && (
                <button onClick={() => setModalOpen(true)}>Add New Workshop</button>
            )}
            <ul>
                {workshops.map(workshop => (
                    <li key={workshop.id}>
                        {workshop.ime} - {workshop.opis}
                        {role === 'admin' && (
                            <button onClick={() => {/* logic to edit this workshop */}}>Edit</button>
                        )}
                    </li>
                ))}
            </ul>
            {modalOpen && <AddEditWorkshopModal onClose={() => setModalOpen(false)} />}
        </div>
    );
}

export default Workshops;
