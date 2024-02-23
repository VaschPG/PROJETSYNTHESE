const express = require('express');
const Model = require('../models/ExerciseModel');
const router = express.Router();

//Get random exercise by bodypart
router.get('/getRandomFromBodyPart/:bodyPart', async (req, res) => {
    try{
        let part = req.params['bodyPart'];
        console.log(part);
        const data = await Model.aggregate([
            { $match: { bodyPart: part} },
            { $sample: { size: 1 } },
        ]).exec();
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getRandomExercises/:nb', async (req, res) => {
    
    try{
        let nb = Number(req.params['nb']);
        const data = await Model.aggregate([
            { $sample: { size: nb } }
        ]).exec();
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})


module.exports = router;