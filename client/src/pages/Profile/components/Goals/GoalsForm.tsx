import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Goals.css";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_GOALS_URL = import.meta.env.VITE_API_GOALS_URL;
const FULL_API_URL = BASE_API_URL + API_GOALS_URL;

interface Goal {
  _id?: string;
  text: string;
  status: boolean;
}

interface IProps {
  handleAddGoal: (goal: Goal) => void;
}

function GoalsForm({ handleAddGoal }: IProps) {
  const [showValidation, setShowValidation] = useState(false);
  const { user } = useAuth0();

  async function postFormData(goal: Goal) {
    const userID = user?.sub?.substring(user?.sub.indexOf("|") + 1);
    const data = { userID: userID, goal: goal };
    fetch(`${FULL_API_URL}InsertOne/`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          showErrorMessage(response);
          throw Error(response.status.toString());
        }
      })
      .then((data) => {
        handleAddGoal(data);
      })
      .catch((error) => console.error("Erreur lors du chargement des objectifs:", error));
  }

  async function showErrorMessage(response: Response) {
    const json = await response.json();
    console.log(json.message);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;
    if (target.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const data = {
        text: target.goalText.value,
        //Fix this when we add checkbox
        status: false,
      };
      postFormData(data);
    }
    setShowValidation(true);
  }

  return (
    <>
      <div className="add-goal">
        <Form noValidate validated={showValidation} onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="form">
            <Col sm="7">
              <Form.Control name="goalText" type="text" placeholder="Nouvel objectif" required pattern="(?=.*\S).{1,}" />
              <Form.Control.Feedback></Form.Control.Feedback>
              <Form.Control.Feedback className="text-white" type="invalid">
                <b>Veuillez entrer un objectif</b>
              </Form.Control.Feedback>
            </Col>

            <Col sm="5" style={{ float: "right" }}>
              <Button type="submit">Ajouter objectif</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default GoalsForm;
