import React, { useState } from 'react';

// formData stocks les donnees de l'utilisateur du formulaire, setData met les donnees a jour
const PersonalInfo: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        age: '',
        gender: '',
        weight: '',
        height: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
                //Implementer un try and catch pour les erreurs 
            console.log('Données soumises :', formData);
        } catch (error) {
            console.error('Une erreur s\'est produite:', error);
        }
    };

    return (
        <div>
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit}>
                {/* Inputs et labels pour les données personnelles */}
                <div>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Age:
                        <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Gender:
                        <select name="gender" value={formData.gender} onChange={handleSelectChange} required>
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Weight (kg):
                        <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Height (cm):
                        <input type="number" name="height" value={formData.height} onChange={handleInputChange} required />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PersonalInfo;