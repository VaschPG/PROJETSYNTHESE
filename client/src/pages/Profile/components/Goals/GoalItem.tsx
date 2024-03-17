import { useEffect, useState } from "react";
import { Goal } from "./Goals";
import { useAuth0 } from "@auth0/auth0-react";

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
  const [isCheckboxSending, setIsCheckboxSending] = useState(false);

  useEffect(() => {
    setIsCheckboxSending(true);
  }, []);

  function handleOnCheck(e: React.ChangeEvent<HTMLInputElement>) {
    fetchSaveCheckboxState(e.target.checked);
  }

  async function fetchSaveCheckboxState(isChecked: boolean) {
    const userID = user?.sub?.substring(user?.sub.indexOf("|") + 1);
    const data = { userID: userID, goal: { ...goal, status: isChecked } };
    console.log(data);
    setIsCheckboxSending(true);
    fetch(`${FULL_API_URL}UpdateOne/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status.toString());
        }
      })
      .then((data) => {
        console.log("wew" + Date.now());
      })
      .catch((error) => console.error("Erreur lors du chargement des objectifs:", error));
    setIsCheckboxSending(false);
  }

  return (
    <div className="goal-item">
      <span>{goal.text}</span>
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
      <button
        onClick={() => {
          fetchSaveCheckboxState(true);
        }}
      >
        {" "}
        Test
      </button>
    </div>
  );
}

export default GoalItem;
