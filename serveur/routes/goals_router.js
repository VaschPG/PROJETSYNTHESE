const express = require("express");
const router = express.Router();
const goalsDBO = require("../db/goals_dbo");

router.get('/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const userGoals = await goalsDBO.getAllGoals(userID);
    res.status(200).json(userGoals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const goalText = req.body.text;
    const newGoal = await goalsDBO.addGoal(userID, goalText);
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:goalID', async (req, res) => {
  try {
    const goalID = req.params.goalID;
    await goalsDBO.removeGoal(goalID);
    res.status(200).json({ message: "Objectif supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;