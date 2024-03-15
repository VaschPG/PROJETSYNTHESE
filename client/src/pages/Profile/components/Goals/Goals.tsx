import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import GoalsForm from "./GoalsForm";

import "./Goals.css";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_GOALS_URL = import.meta.env.VITE_API_GOALS_URL;
const FULL_API_URL = BASE_API_URL + API_GOALS_URL;

interface Goal {
  _id?: string;
  text: string;
  status: boolean;
}

function Goals() {
  /////--State--/////
  const { user } = useAuth0();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isShowDeleteButton, setIsShowDeleteButton] = useState(false);
  /////---------/////

  useEffect(() => {
    fetch(`${FULL_API_URL}GetAllOfUser/${user?.sub?.substring(user?.sub.indexOf("|") + 1)}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error;
        }
      })
      .then((data) => setGoals(data.map((goal: Goal) => goal)))
      .catch((error) => console.error("Erreur lors du chargement des objectifs:", error));
  }, [user]);

  const handleRemoveGoal = async (index: number) => {
    const userID = user?.sub?.substring(user?.sub.indexOf("|") + 1);
    const goalID = goals[index]._id;
    const updatedGoals = [...goals.slice(0, index), ...goals.slice(index + 1)];
    const data = { userID: userID, goalID: goalID };
    setGoals(updatedGoals);

    try {
      await fetch(`${FULL_API_URL}DeleteOne/`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    } catch (error) {
      console.error("Erreur de suppression de l'objectif:", error);
    }
  };

  const handleAddGoalToState = (goal: Goal) => {
    setGoals([...goals, goal]);
  };

  //Fix delete button(replace with edit and do css) and add checkbox
  return (
    <>
      <div className="goals-title" style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="h1" style={{ display: "inline" }}>
          Vos objectifs
        </h1>
        <button
          onClick={() => {
            setIsShowDeleteButton(!isShowDeleteButton);
          }}
        >
          Delete
        </button>
      </div>
      <div className="goals-container">
        <div className="goals-list">
          {goals.map((goal, index) => (
            <div key={goal._id} className="goal-item">
              <span>{goal.text}</span>
              <></>
              {isShowDeleteButton && (
                <button className="remove-btn" onClick={() => handleRemoveGoal(index)}>
                  -
                </button>
              )}
            </div>
          ))}
        </div>
        <GoalsForm handleAddGoal={handleAddGoalToState} />
      </div>
    </>
  );
}

export default Goals;
