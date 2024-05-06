import React, { useState } from 'react';
import '../App.css'

function Modal({ onSave, onClose }) {
    const [formData, setFormData] = useState({
        ime: '',
        opis: '',
        datum: '',
        predavac: '',
        broj_prijava: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);  // Pass form data to the parent component
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
                        Opis:
                        <input type="text" name="opis" value={formData.opis} onChange={handleChange} required />
                    </label>
                    <label>
                        Datum:
                        <input type="date" name="datum" value={formData.datum} onChange={handleChange} required />
                    </label>
                    <label>
                        Predavač:
                        <input type="text" name="predavac" value={formData.predavac} onChange={handleChange} required />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
