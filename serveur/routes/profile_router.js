const express = require("express");
const router = express.Router();
const profileDBO = require("../db/profile_dbo");
const progression_dbo = require("../db/progression_dbo");

// Route pour données de profil
router.get("/GetProfile/:id", async function (req, res) {
  try {
    const id = req.params["id"];
    let profileData = await profileDBO.getProfile(id);
    const weight = await progression_dbo.getLatestWeight(id);
    profileData = profileData[0];
    console.log(profileData);
    console.log(weight);
    profileData.weight = weight[0].weight;
    res.status(200).json(profileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/Insert", async function (req, res) {
  try {
    const body = req.body;
    const response = await profileDBO.insertProfile(body);
    res.status(201).json(response);
  } catch (error) {
    // message d'erreur
    res.status(500).json({ message: error.message });
  }
});

router.post("/UpdateProfile", async function (req, res) {
  try {
    const body = req.body;
    console.log(body);
    const profileData = await profileDBO.updateProfile(body);
    res.status(200).json(profileData[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/UpsertExercisePlan", async (req, res) => {
  try {
    const exercisePlan = req.body.exercisePlan;
    const userID = req.body.userID;
    const data = await profileDBO.upsertExercisePlan(userID, exercisePlan);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/GetExercisePlanByName", async (req, res) => {
  try {
    const exercisePlanName = req.body.exercisePlanName;
    const userID = req.body.userID;
    const data = await profileDBO.getExercisePlan(userID, exercisePlanName);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
