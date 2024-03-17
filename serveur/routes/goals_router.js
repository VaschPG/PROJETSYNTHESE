const express = require("express");
const router = express.Router();
const goalsDBO = require("../db/goals_dbo");

router.get("/GetAllOfUser/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const userGoals = await goalsDBO.getAll(userID);
    res.status(200).json(userGoals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/InsertOne", async (req, res) => {
  try {
    const userID = req.body.userID;
    const insertedGoal = req.body.goal;
    const newGoal = await goalsDBO.insertOne(userID, insertedGoal);
    if (newGoal._id != null) {
      res.status(201).json(newGoal);
    } else {
      res.status(500).json({ message: newGoal.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/UpdateOne", async (req, res) => {
  try {
    const userID = req.body.userID;
    const updatedGoal = req.body.goal;
    console.log(updatedGoal);
    const resGoal = await goalsDBO.updateOne(userID, updatedGoal);
    if (resGoal._id != null) {
      res.status(200).json({ status: updatedGoal.status });
    } else {
      res.status(500).json({ message: resGoal.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/DeleteOne", async (req, res) => {
  try {
    const userID = req.body.userID;
    const goalID = req.body.goalID;
    await goalsDBO.removeOne(userID, goalID);
    res.status(200).json({ message: "Objectif supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
