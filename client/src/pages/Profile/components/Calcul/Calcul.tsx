import { Button, Container } from "react-bootstrap";
import InfoIMC from "./InfoIMC";
import InfoIdeal from "./InfoIdeal";
import InfoCalorie from "./InfoCalorie";
import { useEffect, useState } from "react";
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

const Calcul = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const FETCH_URL = `${FULL_API_URL}GetProfile/${user?.sub?.substring(user?.sub.indexOf("|") + 1)}`;

      console.log("fetching from " + FETCH_URL);
      const response = await fetch(FETCH_URL, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setFormData(data);
      } else {
        console.log("Response not ok" + data.message);
      }
    } catch (error) {
      console.log("Error on fetchProfile:" + error);
    }
  }

  function calculIMC() {
    fetchProfile();
    const IMCFIELD = document.getElementById("IMCField");
    const tailleEnM = formData.height / 100;
    IMCFIELD!.textContent = "Votre IMC est : " + (formData.weight / (tailleEnM * tailleEnM)).toFixed(2).toString();
  }

  function calculIBW() {
    fetchProfile();
    const IBWField = document.getElementById("IBWField");
    const gender = formData.gender;
    const height = formData.height;
    let IBW = 0;
    if (gender === "female") {
      IBW = 53.1;
      if (height > 152.4) {
        for (let i = 0; i < Math.floor((height - 152.4) / 2.54); i++) {
          IBW += 1.36;
        }
      }
    } else {
      IBW = 56.2;
      if (height > 152.4) {
        for (let i = 0; i < Math.floor((height - 152.4) / 2.54); i++) {
          IBW += 1.41;
        }
      }
    }
    IBWField!.textContent = "Votre poid ideal : " + IBW.toFixed(2) + " kg";
  }

  function calculCalorie() {
    fetchProfile();
    const CalorieField = document.getElementById("CalorieField");
    const gender = formData.gender;
    const height = formData.height;
    const weight = formData.weight;
    const age = formData.age;
    let calorie = 0;
    if (gender === "female") {
      calorie = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
    } else {
      calorie = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
    }

    CalorieField!.textContent = "Calories quotidiennes : " + calorie.toFixed(2) + " calories minimum";
  }

  return (
    <Container className="d-flex flex-column h-100">
      <Container className="d-flex flex-row align-items-center">
        <Button onClick={calculIMC} className="w-100" style={{ marginRight: "5px" }}>
          Calculer votre IMC
        </Button>
        <InfoIMC />
      </Container>
      <h5 id="IMCField" className="text-white text-center mt-3 mb-3"></h5>
      <Container className="d-flex flex-row align-items-center">
        <Button onClick={calculIBW} className="w-100" style={{ marginRight: "5px" }}>
          Calculer votre poids ideal
        </Button>
        <InfoIdeal />
      </Container>
      <h5 id="IBWField" className="text-white text-center mt-3 mb-3"></h5>
      <Container className="d-flex flex-row align-items-center">
        <Button onClick={calculCalorie} className="w-100" style={{ marginRight: "5px" }}>
          Calculer votre calories quotidiennes
        </Button>
        <InfoCalorie />
      </Container>
      <h5 id="CalorieField" className="text-white text-center mt-3 mb-3"></h5>
    </Container>
  );
};

export default Calcul;
