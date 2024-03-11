import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button, Row, Col } from "react-bootstrap";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_GOALS_URL = import.meta.env.VITE_API_GOALS_URL;
const FULL_API_URL = BASE_API_URL + API_GOALS_URL;

interface Goal {
  _id?: string;
  text: string;
  status: boolean;
}

function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { user } = useAuth0();

  useEffect(() => {
    fetch(FULL_API_URL + "/GetAllOfUser/" + user?.sub?.substring(user?.sub.indexOf("|") + 1))
      .then((response) => response.json())
      .then((data) => setGoals(data.map((goal: Goal) => goal)))
      .catch((error) => console.error("Erreur lors du chargement des objectifs:", error));
  }, [user]);

  async function postFormData(goal: Goal) {
    const userID = user?.sub?.substring(user?.sub.indexOf("|") + 1);
    const data = { userID: userID, goal: goal };
    fetch(FULL_API_URL + "InsertOne/", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((data) => setGoals([...goals, data]))
      .catch((error) => console.error("Erreur lors du chargement des objectifs:", error));
  }

  const handleRemoveGoal = async (index: number) => {
    const userID = user?.sub?.substring(user?.sub.indexOf("|") + 1);
    const goalID = goals[index]._id;
    const updatedGoals = [...goals.slice(0, index), ...goals.slice(index + 1)];
    const data = { userID: userID, goalID: goalID };
    setGoals(updatedGoals);

    try {
      await fetch(FULL_API_URL + "DeleteOne/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    } catch (error) {
      console.error("Erreur de suppression de l'objectif:", error);
    }
  };

  return (
    <div className="goals-container">
      <div className="goals-list">
        {goals.map((goal, index) => (
          <div key={goal._id} className="goal-item">
            <span>{goal.text}</span>
            <button className="remove-btn" onClick={() => handleRemoveGoal(index)}>
              -
            </button>
          </div>
        ))}
      </div>
      <div className="add-goal">
        <Form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              text: { value: string };
            };
            const data = {
              text: target.text.value,
              //Fix this when we add checkbox
              status: false,
            };
            postFormData(data);
          }}
        >
          <Form.Group as={Row} controlId="form">
            <Col sm="6">
              <Form.Control name="text" type="text" placeholder="Nouvel objectif" />
            </Col>
            <Col sm="6">
              <Button type="submit">Ajouter objectif</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Goals;
