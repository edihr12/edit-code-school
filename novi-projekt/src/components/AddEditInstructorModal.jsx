
import React, { useState } from 'react';
import axios from 'axios';

function AddEditInstructorModal({ instructor, onSave, onClose }) {
    const [formData, setFormData] = useState({
        ime: instructor ? instructor.ime : '',
        biografija: instructor ? instructor.biografija : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = instructor ? `http://localhost:5000/predavaci/${instructor.id}` : 'http://localhost:5000/predavaci';
        const method = instructor ? axios.put : axios.post;

        method(url, formData)
            .then(() => {
                onSave();
                onClose();
            })
            .catch(error => console.error('Failed to save instructor:', error));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Ime predavača:
                        <input type="text" name="ime" value={formData.ime} onChange={handleChange} required />
                    </label>
                    <label>
                        Biografija:
                        <textarea name="biografija" value={formData.biografija} onChange={handleChange} required />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default AddEditInstructorModal;
