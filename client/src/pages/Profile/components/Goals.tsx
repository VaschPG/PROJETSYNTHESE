import React, { useState } from 'react';

function Goals() {
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewGoal(event.target.value);
  };

  const handleAddGoal = async () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');

      
      try {
        await fetch(`/api/save-goals/${profileId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ goals: [...goals, newGoal.trim()] })
        });
      } catch (error) {
        console.error('Erreur de la sauvegarde des objectifs:', error);
      }
    }
  };

  const handleRemoveGoal = async (index: number) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);


    try {
      await fetch(`/api/save-goals/${profileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ goals: updatedGoals })
      });
    } catch (error) {
      console.error('Erreur de la sauvegarde des objectifs:', error);
    }
  };

  return (
    <div className="goals-container">
      
      <div className="goals-list">
        {goals.map((goal, index) => (
          <div key={index} className="goal-item">
            <span>{goal}</span>
            <button className="remove-btn" onClick={() => handleRemoveGoal(index)}>-</button>
          </div>
        ))}
      </div>
      <div className="add-goal">
        <input type="text" value={newGoal} onChange={handleChange} placeholder="Nouvel objectif" />
        <button onClick={handleAddGoal}>Ajouter objectif</button>
      </div>
    </div>
  );
};

export default Goals;