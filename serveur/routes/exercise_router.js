const express = require('express');
const exerciseModel = require('../models/exercise_model');
const router = express.Router();
const exerciseDBO = require('../db/exercise_dbo');

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
		const data = await exerciseDBO.getRandomExercises(nb);
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
		const data = await exerciseDBO.getDistinctEquipmentArray();
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
		array.equipmentArray = await exerciseDBO.getDistinctEquipmentArray();
		array.bodyPartArray = await exerciseDBO.getDistinctBodyPartArray();
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
		const bodyPartArray = req.query.bodyPart;
		const returnedArray = new Array();
		for (let i = 0; i < bodyPartArray.length; i++) {
			let exercise = await exerciseDBO.getRandomExercisesFromBodyPart(bodyPartArray[i], 1);
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
	//const equipment = req.query.equipment;
	//res.status(200).json(equipment);
	const data = await exerciseDBO.otherGetDistinctBodyPartArray();
	res.status(200).json(data);
});

/**
 * Another test route, wanted to see how long a fairly big number of requests to the db would take.
 */
router.get('/testQueryTime/', async (req, res) => {
	const nbRequests = 50;
	let arr = new Array();
	for (let i = 0; i < nbRequests; i++) {
		let o = await exerciseDBO.getRandomExercises(1);
		arr.push(o);
	}
	res.status(200).json(arr);
});

/**
 * CHANGE THE ROUTE OF THIS LATER
 */
router.get('/gigaQuery/', async (req, res) => {
	try {
		const bodyPartArray = req.query.bodyPart;
		const equipmentArray = req.query.equipmentArray;
		const returnedArray = new Array();
		for (let i = 0; i < bodyPartArray.length; i++) {
			let exercise = await exerciseDBO.getOneExerciseMatchingBodyPartAndEquipment(bodyPartArray[i], equipmentArray);
			returnedArray[i] = exercise[0];
		}
		res.status(200).json(returnedArray);
	} catch (error) {
		res.status(500).json({ data });
	}
});

/**
 * CHANGE THE ROUTE OF THIS LATER
 */
router.get('/gigaQuery2/', async (req, res) => {
	try {
		const bodyPartArray = req.query.bodyPart;
		const equipmentArray = req.query.equipment;
		const returnedArray = new Array();
		const noDuplicateCheckingArray = new Array();
		for (let i = 0; i < bodyPartArray.length; i++) {
			let exercise = await exerciseDBO.getOneExerciseNotInArrayAndMatchingBodyPartAndEquipment(
				bodyPartArray[i],
				noDuplicateCheckingArray,
				equipmentArray
			);
			returnedArray[i] = exercise[0];
			if (exercise[0] != null || undefined) {
				noDuplicateCheckingArray[i] = exercise[0].id;
			}
		}
		res.status(200).json(returnedArray);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
module.exports = router;
