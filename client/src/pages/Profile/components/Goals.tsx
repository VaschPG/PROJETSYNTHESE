import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Goals() {
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const { user } = useAuth0();

  useEffect(() => {
    fetch(`/api/goals/${user?.sub?.substring(user?.sub.indexOf("|") + 1)}`)
      .then((response) => response.json())
      .then((data) => setGoals(data.map((goal: any) => goal.text)))
      .catch((error) => console.error("Erreur lors du chargement des objectifs:", error));
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewGoal(event.target.value);
  };

  const handleAddGoal = async () => {
    if (newGoal.trim() !== "") {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal("");

      try {
        await fetch(`/api/goals/${user?.sub?.substring(user?.sub.indexOf("|") + 1)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newGoal.trim() }),
        });
      } catch (error) {
        console.error("Erreur de l'ajout de l'objectif:", error);
      }
    }
  };

  const handleRemoveGoal = async (index: number) => {
    const goalID = goals[index];
    const updatedGoals = [...goals.slice(0, index), ...goals.slice(index + 1)];
    setGoals(updatedGoals);

    try {
      await fetch(`/api/goals/${goalID}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Erreur de suppression de l'objectif:", error);
    }
  };

  return (
    <div className="goals-container">
      <div className="goals-list">
        {goals.map((goal, index) => (
          <div key={index} className="goal-item">
            <span>{goal}</span>
            <button className="remove-btn" onClick={() => handleRemoveGoal(index)}>
              -
            </button>
          </div>
        ))}
      </div>
      <div className="add-goal">
        <input type="text" value={newGoal} onChange={handleChange} placeholder="Nouvel objectif" />
        <button onClick={handleAddGoal}>Ajouter objectif</button>
      </div>
    </div>
  );
}

export default Goals;
