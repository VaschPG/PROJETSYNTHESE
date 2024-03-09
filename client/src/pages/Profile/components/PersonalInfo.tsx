import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_EXERCISES_URL = import.meta.env.VITE_API_PROFILE_URL;
const FULL_API_URL = BASE_API_URL + API_EXERCISES_URL;

const DEFAULT_FORM_DATA = {
  firstName: " ",
  lastName: " ",
  age: 0,
  gender: "",
  weight: 0,
  height: 0,
};

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
  const { user } = useAuth0();
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);

  useEffect(() => {
    fetchProfile();
    /*const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setFormData(JSON.parse(savedUserData));
    }*/
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = ["age", "weight", "height"].includes(name) ? parseInt(value, 10) : value;
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
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      age: { value: number };
      gender: { value: string };
      weight: { value: number };
      height: { value: number };
    };

    const data = {
      _id: user?.sub?.substring(user?.sub.indexOf("|") + 1),
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      age: target.age.value,
      gender: target.gender.value,
      weight: target.weight.value,
      height: target.height.value,
    };

    fetchUpdateProfile(data);
    /*console.log("Form submitted");
    try {
      localStorage.setItem("userData", JSON.stringify(formData));

      console.log("User:", user);
      console.log("Données soumises:", formData);

      alert("Données sauvegardées");
    } catch (error) {
      console.error("Une erreur s'est produite:", error);
    }*/
  };

  async function fetchProfile() {
    try {
      const FETCH_URL = FULL_API_URL + "getProfile/" + user?.sub?.substring(user?.sub.indexOf("|") + 1);

      console.log("fetching from " + FETCH_URL);
      const response = await fetch(FETCH_URL, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Successfully fetched in: ");
        setFormData(data);
      } else {
        console.log("Response not ok" + data.message);
      }
    } catch (error) {
      console.log("Error on fetchProfile:" + error);
    }
    console.log(formData);
  }

  async function fetchUpdateProfile(data: {
    _id: string | undefined;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    weight: number;
    height: number;
  }) {
    try {
      const FETCH_URL = FULL_API_URL + "updateProfile";

      console.log("fetching from " + FETCH_URL);
      const response = await fetch(FETCH_URL, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Successfully posted from " + FETCH_URL);
      } else {
        console.log("Response not ok");
      }
    } catch (error) {
      console.log("Error on fetchProfile:" + error);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} method="post">
        <div className="form-group">
          <div className="input-wrap">
            <label className="label">Prénom :</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="input-field" required />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrap">
            <label className="label">Nom :</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="input-field" required />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrap">
            <label className="label">Âge :</label>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="input-field" required />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrap">
            <label className="label">Genre :</label>
            <select name="gender" value={formData.gender} onChange={handleSelectChange} className="input-field" required>
              <option value="">Selectionner...</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="non-binary">Non-Binaire</option>
              <option value="other">Autre</option>
              <option value="prefer not to answer">Préfère ne pas répondre</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrap">
            <label className="label">Poids (kg):</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} className="input-field" required />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrap">
            <label className="label">Taille (cm):</label>
            <input type="number" name="height" value={formData.height} onChange={handleInputChange} className="input-field" required />
          </div>
        </div>
        <button type="submit">Sauvegarder</button>
      </form>
      <div className="text-white">{user?.sub?.substring(user?.sub.indexOf("|") + 1)}</div>
    </div>
  );
};

export default PersonalInfo;
