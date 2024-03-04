import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Pour eviter detections erreurs
interface FormData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
}

const PersonalInfo: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    weight: 0,
    height: 0,
  });


  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
        setFormData(JSON.parse(savedUserData));
    }
}, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = ["age", "weight", "height"].includes(name)
      ? parseInt(value, 10)
      : value;
    setFormData({
      ...formData,
      [name]: numericValue,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    try {
        localStorage.setItem('userData', JSON.stringify(formData));

        console.log('User:', user);
        console.log('Données soumises:', formData);

        alert('Données sauvegardées')
    } catch (error) {
        console.error('Une erreur s\'est produite:', error);
    }
};

  return (
    <div className="form-container">
      {isAuthenticated && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrap">
              <label className="label">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrap">
              <label className="label">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrap">
              <label className="label">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrap">
              <label className="label">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleSelectChange}
                className="input-field"
                required
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
                <option value="other">Other</option>
                <option value="prefer not to answer">
                  Prefer not to answer
                </option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrap">
              <label className="label">Weight (kg):</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrap">
              <label className="label">Height (cm):</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      )}
      {!isAuthenticated && (
        <div>Veuillez vous connecter pour voir ce contenu.</div>
      )}
    </div>
  );
};

export default PersonalInfo;
