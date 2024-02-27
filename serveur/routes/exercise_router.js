const express = require('express');
const exerciseModel = require('../models/exercise_model');
const router = express.Router();
const dbo = require('../db/dbo');

/**
 * Get a number of random exercises based on the bodypart.
 * @param bodyPart:string Body part of exercises.
 * @param nb:Number Amount of exercises.
 */
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

/**
 * Get a number of random exercises.
 * @param nb:Number Amount of exercises
 */
router.get('/getRandomExercises/:nb', async (req, res) => {
	try {
		let nb = Number(req.params['nb']);
		const data = await dbo.getRandomExercises(nb);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get array of distinct body parts from the database
 */
router.get('/getBodyPartArray', async (req, res) => {
	try {
		const data = await dbo.getDistinctEquipmentArray();
		console.log('data' + data);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get array of distinct body parts and equipment from the database
 * @responds With status(200) and a json that looks like this:
 * {"equipmentArray": [ { "equipment": "body weight"}, { "equipment": "dumbbell"}],
 *  "bodyPart": [ { "bodyPart": "upper arms" }, { "bodyPart": "upper legs" } ] }
 *  or with a status(500) and a json with the error message.
 */
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

/**
 * Get an array of exercises where exercise[i].bodyPart = query.bodyPart[i];
 * @param query An array of bodyPart.
 * @responds With status(200) and a json of an array of exercises from the database.
 */
router.get('/getExercisesByBodyPartQuery/', async (req, res) => {
	try {
		const bodyPartArr = req.query.bodyPart;
		const returnedArray = new Array();
		for (let i = 0; i < bodyPartArr.length; i++) {
			let exercise = await dbo.getRandomExercisesFromBodyPart(bodyPartArr[i], 1);
			returnedArray[i] = exercise[0];
		}
		res.status(200).json(returnedArray);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Just a test route, was using it to test using query.
 */
router.get('/testQuery/', async (req, res) => {
	const equipment = req.query.equipment;
	res.status(200).json(equipment);
});

/**
 * Another test route, wanted to see how long a fairly big number of requests to the db would take.
 */
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
