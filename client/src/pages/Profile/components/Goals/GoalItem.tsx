import { useEffect, useState } from "react";
import { Goal } from "./Goals";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "react-bootstrap/esm/Spinner";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const API_GOALS_URL = import.meta.env.VITE_API_GOALS_URL;
const FULL_API_URL = BASE_API_URL + API_GOALS_URL;

interface IProps {
  goal: Goal;
  isShowDeleteButton: boolean;
  handleRemoveGoal: (goalID: string) => void;
}

function GoalItem({ goal, isShowDeleteButton, handleRemoveGoal }: IProps) {
  const { user } = useAuth0();
  const [isSending, setIsSending] = useState(false);
  const [isChecked, setIsChecked] = useState(goal.status);

  function handleOnCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setIsSending(true);
    fetchSaveCheckboxState(e.target.checked);
  }

  async function fetchSaveCheckboxState(isChecked: boolean) {
    const userID = user?.sub?.substring(user?.sub.indexOf("|") + 1);
    const data = { userID: userID, goal: { ...goal, status: isChecked } };

    fetch(`${FULL_API_URL}UpdateOne/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status.toString());
        }
      })
      .then((data) => {
        setIsChecked(data.status);
        setIsSending(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des objectifs:", error);
        setIsSending(false);
      });
  }

  return (
    <div className="goal-item">
      <span>{goal.text}</span>
      <div>
        {isSending && (
          <Spinner animation="border" role="status" style={{ width: "1em", height: "1em", color: "gray" }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isSending}
          onChange={handleOnCheck}
          style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "8px", transform: "scale(1.25)" }}
        ></input>
        {isShowDeleteButton && (
          <button
            className="remove-btn"
            onClick={() => {
              if (goal._id != null) {
                handleRemoveGoal(goal._id);
              }
            }}
          >
            -
          </button>
        )}
      </div>
    </div>
  );
}

export default GoalItem;
