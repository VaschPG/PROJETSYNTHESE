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
    console.log(profileData);
    //const sentProfileData =
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
module.exports = router;
