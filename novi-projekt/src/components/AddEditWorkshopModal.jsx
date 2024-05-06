import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddEditWorkshopModal({ workshop, onSave, onClose }) {
    const [formData, setFormData] = useState({
        ime: workshop ? workshop.ime : '',
        tema: workshop ? workshop.tema : '',
        tezina: workshop ? workshop.tezina : '',
        datum: workshop ? workshop.datum : '',
        opis: workshop ? workshop.opis : ''
    });
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/predavaci')
            .then(response => {
                setInstructors(response.data);
            })
            .catch(error => console.error('Error loading instructors:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = workshop ? `http://localhost:5000/radionice/${workshop.id}` : 'http://localhost:5000/radionice';
        const method = workshop ? axios.put : axios.post;

        method(url, formData)
            .then(() => {
                onSave();
                onClose();
            })
            .catch(error => console.error('Failed to save workshop:', error));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Ime radionice:
                        <input type="text" name="ime" value={formData.ime} onChange={handleChange} required />
                    </label>
                    <label>
                        Tema:
                        <select name="tema" value={formData.tema} onChange={handleChange} required>
                            <option value="">Select a theme</option>
                            {/* Example themes */}
                            <option value="React">React</option>
                            <option value="Vue">Vue</option>
                        </select>
                    </label>
                    <label>
                        Težina:
                        <select name="tezina" value={formData.tezina} onChange={handleChange} required>
                            <option value="">Select difficulty</option>
                            {/* Example difficulty levels */}
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
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
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default AddEditWorkshopModal;
