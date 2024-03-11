const express = require("express");
const router = express.Router();
const progressionDBO = require("../db/progression_dbo");

//Check if these still work before using them.
router.get("/GetAllOfUser/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const data = await progressionDBO.getAll(userID);
    res.status(200).json({ progression: data });
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

router.put("/InsertOne/", async (req, res) => {
  try {
    const userID = req.body.userID;
    const progression = req.body.progression;
    console.log(req.body);
    const data = await progressionDBO.insertOne(userID, progression);
    if (data != null) {
      res.status(201).json({ message: "Success" });
    } else {
      res.status(500).json({ message: "Error during insertion" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/InitialAndLatestWeight/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const initialWeight = await progressionDBO.getInitialWeight(userID);
    const latestWeight = await progressionDBO.getLatestWeight(userID);
    const data = { initialWeight: initialWeight[0], latestWeight: latestWeight[0] };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
