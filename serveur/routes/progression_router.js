const express = require("express");
const router = express.Router();
const progressionDBO = require("../db/progression_dbo");

//Check if these still work before using them.
router.get("/GetAllOfUser/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const data = await progressionDBO.getAllProgression(userID);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/InitialWeight/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const data = await progressionDBO.getInitialWeight(userID);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/LatestWeight/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const data = await progressionDBO.getLatestWeight(userID);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/InsertOne/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const progression = req.body.progression;
    const data = await progressionDBO.insertOne(userID, progression);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
