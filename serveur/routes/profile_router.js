const express = require('express');
const router = express.Router();
const profileDBO = require('../db/profile_dbo');

// Route pour données de profil
router.get('/profile', async function(req, res) {
    try {
        
        const profileData = await profileDBO.getProfileData(userId);
        
        // Réponse 
        res.status(200).json(profileData);
    } catch (error) {
        // message d'erreur
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;