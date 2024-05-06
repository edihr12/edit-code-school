import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InstructorModal({ instructor, onClose, onSave }) {
    const [formData, setFormData] = useState({
        ime: instructor ? instructor.ime : '',
        biografija: instructor ? instructor.biografija : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (instructor) {
                await axios.put(`http://localhost:5000/predavaci/${instructor.id}`, formData);
            } else {
                await axios.post('http://localhost:5000/predavaci', formData);
            }
            onSave();
        } catch (error) {
            console.error('Failed to save instructor:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Ime:
                        <input type="text" name="ime" value={formData.ime} onChange={handleChange} required />
                    </label>
                    <label>
                        Biografija:
                        <textarea name="biografija" value={formData.biografija} onChange={handleChange} required />
                    </label>
                    <button type="submit">Spremi</button>
                </form>
            </div>
        </div>
    );
}

export default InstructorModal;
