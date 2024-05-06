import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRole } from '../UserRoleContext';
import InstructorModal from './InstructorModal'; // A modal component for adding/editing

function Instructors() {
    const [instructors, setInstructors] = useState([]);
    const { role } = useRole();
    const [modalOpen, setModalOpen] = useState(false);
    const [currentInstructor, setCurrentInstructor] = useState(null);

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/predavaci');
            setInstructors(response.data);
        } catch (error) {
            console.error('Failed to fetch instructors:', error);
        }
    };

    const handleAddClick = () => {
        setCurrentInstructor(null);
        setModalOpen(true);
    };

    const handleEditClick = (instructor) => {
        setCurrentInstructor(instructor);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/predavaci/${id}`);
            fetchInstructors(); // Refresh the list after deletion
        } catch (error) {
            console.error('Failed to delete instructor:', error);
        }
    };

    return (
        <div>
            {role === 'admin' && (
                <button onClick={handleAddClick}>Dodaj novog predavača</button>
            )}
            {instructors.map(instructor => (
                <div key={instructor.id}>
                    <h3>{instructor.ime}</h3>
                    <p>{instructor.biografija}</p>
                    {role === 'admin' && (
                        <div>
                            <button onClick={() => handleEditClick(instructor)}>Uredi</button>
                            <button onClick={() => handleDelete(instructor.id)}>Obriši</button>
                        </div>
                    )}
                </div>
            ))}
            {modalOpen && (
                <InstructorModal
                    instructor={currentInstructor}
                    onClose={() => setModalOpen(false)}
                    onSave={() => {
                        setModalOpen(false);
                        fetchInstructors();
                    }}
                />
            )}
        </div>
    );
}

export default Instructors;
