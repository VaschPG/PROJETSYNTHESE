const express = require("express");
const router = express.Router();
const progressionDBO = require("../db/progression_dbo");

router.get("/GetAllOfUser/:userID", async (req, res) => {
  try {
    const userID = Number(req.params.userID);
    const data = await progressionDBO.getAllProgression(userID);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/InitialWeight/:userID", async (req, res) => {
  try {
    const userID = Number(req.params.userID);
    const data = await progressionDBO.getInitialWeight(userID);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/LatestWeight/:userID", async (req, res) => {
  try {
    const userID = Number(req.params.userID);
    const data = await progressionDBO.getLatestWeight(userID);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
