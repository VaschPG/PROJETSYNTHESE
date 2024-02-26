const express = require('express');
const exerciseModel = require('../models/exercise_model');
const router = express.Router();
const dbo = require('../db/dbo');

//Get a number of random exercises based on the bodypart
router.get('/getRandomExercisesFromBodyPart/:bodyPart/:nb?', async (req, res) => {
	try {
		let _bodyPart = req.params['bodyPart'];
		let nb = Number(req.params['nb']) || 1;
		const data = await exerciseModel.aggregate([{ $match: { bodyPart: _bodyPart } }, { $sample: { size: nb } }]).exec();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/getRandomExercises/:nb', async (req, res) => {
	try {
		let nb = Number(req.params['nb']);
		const data = await dbo.getRandomExercises(nb);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/getBodyPartArray', async (req, res) => {
	try {
		const data = await dbo.getDistinctEquipmentArray();
		console.log('data' + data);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/getBodyPartAndEquipmentArray', async (req, res) => {
	try {
		const array = { equipmentArray: [], bodyPartArray: [] };
		array.equipmentArray = await dbo.getDistinctEquipmentArray();
		array.bodyPartArray = await dbo.getDistinctBodyPartArray();
		res.status(200).json(array);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/testQuery/', async (req, res) => {
	const equipment = req.query.equipment;
	res.status(200).json(equipment);
});

router.get('/getExercisesByBodyPartQuery/', async (req, res) => {
	const bodyPartArr = req.query.bodyPart;
	const returnedArray = new Array();
	for (let i = 0; i < bodyPartArr.length; i++) {
		let exercise = await dbo.getRandomExercisesFromBodyPart(bodyPartArr[i], 1);
		returnedArray[i] = exercise[0];
	}
	res.status(200).json(returnedArray);
});

router.get('/testQueryTime/', async (req, res) => {
	const nbRequests = 50;
	let arr = new Array();
	for (let i = 0; i < nbRequests; i++) {
		let o = await dbo.getRandomExercises(1);
		arr.push(o);
	}
	res.status(200).json(arr);
});

module.exports = router;
