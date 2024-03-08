const express = require("express");
const router = express.Router();
const profileDBO = require("../db/profile_dbo");

// Route pour données de profil
router.post("/insertId/:id", async function (req, res) {
  try {
    const id = req.params["id"];
    const profileData = await profileDBO.insertProfile(id);
    res.status(200).json(profileData[0]);
  } catch (error) {
    // message d'erreur
    res.status(500).json({ message: error.message });
  }
});

router.post("/insert", async function (req, res) {
  try {
    const body = req.body;
    const response = await profileDBO.insertProfile(body);
    res.status(200).json(response);
  } catch (error) {
    // message d'erreur
    res.status(500).json({ message: error.message });
  }
});

router.get("/getProfile/:id", async function (req, res) {
  try {
    const id = req.params["id"];
    const profileData = await profileDBO.getProfile(id);
    res.status(200).json(profileData[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/updateProfile", async function (req, res) {
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
