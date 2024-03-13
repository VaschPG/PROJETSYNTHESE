import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';



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
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchProfile();
    /*const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setFormData(JSON.parse(savedUserData));
    }*/
  }, []);

  //ne fonctionnait pas, dont know why
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.currentTarget;
      e.preventDefault();
    if (target.checkValidity() === false){
      e.stopPropagation();
    }else{
      setValidated(true);
      
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
    }
    

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

  function showToast() {
    setShow(true);
  }

  async function fetchProfile() {
    try {
      const FETCH_URL = FULL_API_URL + "GetProfile/" + user?.sub?.substring(user?.sub.indexOf("|") + 1);

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
      const FETCH_URL = FULL_API_URL + "UpdateProfile";

      console.log("fetching from " + FETCH_URL);
      const response = await fetch(FETCH_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Successfully posted from " + FETCH_URL);
        showToast();
      } else {
        console.log("Response not ok");
      }
    } catch (error) {
      console.log("Error on fetchProfile:" + error);
    }
  }

  return (
      <>
      <Container className="position-relative">
      <Form noValidate validated={validated} onSubmit={handleSubmit} method="post">
      <Row>
        <Form.Group as={Col} md="12" controlId="firstName">
          <Form.Label className="text-white">Prenom :</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.firstName}
            onChange={e => setFormData({ ...formData, ["firstName"]: e.target.value, })}
            ></Form.Control>
          <Form.Control.Feedback></Form.Control.Feedback>
          <Form.Control.Feedback className="text-white" type="invalid">
            <b>
            Entrez un prénom.
            </b>
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="12" controlId="lastName">
          <Form.Label className="text-white">Nom :</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.lastName}
            onChange={e => setFormData({ ...formData, ["lastName"]: e.target.value, })}
            ></Form.Control>
          <Form.Control.Feedback></Form.Control.Feedback>
          <Form.Control.Feedback className="text-white" type="invalid">
            <b>
            Entrez un nom.
            </b>
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="12" controlId="age">
          <Form.Label className="text-white">Âge :</Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            value={formData.age}
            onChange={e => setFormData({ ...formData, ["age"]: parseInt(e.target.value) })}
            ></Form.Control>
          <Form.Control.Feedback></Form.Control.Feedback>
          <Form.Control.Feedback className="text-white" type="invalid">
            <b>
            Entrez un âge.
            </b>
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="12" controlId="gender">
          <Form.Label className="text-white">Genre :</Form.Label>
          <Form.Control
            as="select"
            required
            value={formData.gender}
            onChange={e => setFormData({ ...formData, ["gender"]: e.target.value, })}>
            <option disabled value="">Selectionner...</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="non-binary">Non-Binaire</option>
            <option value="other">Autre</option>
            <option value="prefer not to answer">Préfère ne pas répondre</option>
          </Form.Control>
          <Form.Control.Feedback></Form.Control.Feedback>
          <Form.Control.Feedback className="text-white" type="invalid">
            <b>
            SVP choisir un choix
            </b>
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="12" controlId="weight">
          <Form.Label className="text-white">Poids (kg):</Form.Label>
          <Form.Control
            required
            type="number"
            step="0.01"
            value={formData.weight}
            onChange={e => setFormData({ ...formData, ["weight"]: parseFloat(e.target.value) })}
            ></Form.Control>
          <Form.Control.Feedback></Form.Control.Feedback>
          <Form.Control.Feedback className="text-white" type="invalid">
            <b>
            Entrez votre poids en kg.
            </b>
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} className="mb-3" md="12" controlId="height">
          <Form.Label className="text-white">Taille (cm):</Form.Label>
          <Form.Control
            required
            type="number"
            step="0.01"
            value={formData.height}
            onChange={e => setFormData({ ...formData, ["height"]: parseFloat(e.target.value) })}
            ></Form.Control>
          <Form.Control.Feedback></Form.Control.Feedback>
          <Form.Control.Feedback className="text-white" type="invalid">
            <b>
            Entrez votre taille en cm.
            </b>
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    {/* TOAST */}
      <Toast onClose={() => setShow(false)} show={show} delay={4000} bg="info" autohide className="position-absolute end-0 bottom-0">
          <Toast.Header>
            <strong className="me-auto">User update</strong>
            <small>maintenant</small>
          </Toast.Header>
          <Toast.Body>Les informations de {formData.firstName} {formData.lastName} ont été sauvegardées!</Toast.Body>
        </Toast>
      <Button className="btn-info" type="submit">Sauvegarder
      </Button>
    </Form>
      </Container>
    </>
  );
};

export default PersonalInfo;
