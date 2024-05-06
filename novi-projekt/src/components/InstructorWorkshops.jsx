import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InstructorWorkshops() {
    const [workshops, setWorkshops] = useState([]);
    const { instructorName } = useParams(); // Use the instructor's name to fetch workshops

    useEffect(() => {
        axios.get(`http://localhost:5000/radionice?predavac=${instructorName}`)
            .then(response => {
                setWorkshops(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, [instructorName]);

    return (
        <div>
            <h2>Workshops by {instructorName}</h2>
            {workshops.map(workshop => (
                <div key={workshop.id}>
                    <h3>{workshop.ime}</h3>
                    <p>{workshop.opis}</p>
                </div>
            ))}
        </div>
    );
}

export default InstructorWorkshops;
