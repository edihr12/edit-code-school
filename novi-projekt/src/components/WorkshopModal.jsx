import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkshopModal({ workshop = {}, onClose, onSave }) {
    const [formData, setFormData] = useState({
        ime: workshop.ime || '',
        tema: workshop.tema || '',
        tezina: workshop.tezina || '',
        datum: workshop.datum || '',
        opis: workshop.opis || '',
        predavac: workshop.predavac || ''
    });
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/predavaci')
            .then(response => setInstructors(response.data))
            .catch(error => console.error('Error loading instructors:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <form onSubmit={handleSubmit}>
                    <label>
                        Ime radionice:
                        <input type="text" name="ime" value={formData.ime} onChange={handleChange} required />
                    </label>
                    <label>
                        Tema:
                        <select name="tema" value={formData.tema} onChange={handleChange} required>
                            <option value="">Select Theme</option>
                            <option value="React">React</option>
                            <option value="JavaScript">JavaScript</option>
                            {/* Add more themes as needed */}
                        </select>
                    </label>
                    <label>
                        Težina:
                        <select name="tezina" value={formData.tezina} onChange={handleChange} required>
                            <option value="">Select Difficulty</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </label>
                    <label>
                        Datum održavanja:
                        <input type="date" name="datum" value={formData.datum} onChange={handleChange} required />
                    </label>
                    <label>
                        Opis radionice:
                        <textarea name="opis" value={formData.opis} onChange={handleChange} required />
                    </label>
                    <label>
                        Predavači:
                        <select name="predavac" value={formData.predavac} onChange={handleChange} required>
                            <option value="">Select Instructor</option>
                            {instructors.map(instr => (
                                <option key={instr.id} value={instr.id}>{instr.ime}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Spremi</button>
                </form>
            </div>
        </div>
    );
}

export default WorkshopModal;
