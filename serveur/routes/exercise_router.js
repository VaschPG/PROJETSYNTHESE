const express = require('express');
const exerciseModel = require('../models/exercise_model');
const router = express.Router();
const exerciseDBO = require('../db/exercise_dbo');

/**
 * Get {nb} amount of random exercises with a specified bodypart.
 * @param bodyPart:string Body part of exercises.
 * @param nb:number Amount of exercises. *Optional, defaults to 1 if absent*
 */
router.get('/RandomWithBodyPart/:bodyPart/:nb?', async (req, res) => {
	try {
		const _bodyPart = req.params['bodyPart'];
		const nb = Number(req.params['nb']) || 1;
		const data = await exerciseDBO.getRandomExercisesWithBodyPart(_bodyPart, nb);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get a number of random exercises.
 * @param nb:Number Amount of exercises
 */
router.get('/Random/:nb', async (req, res) => {
	try {
		const nb = Number(req.params['nb']);
		const data = await exerciseDBO.getRandomExercises(nb);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get array of distinct body parts values from our database
 */
router.get('/DistinctBodyPartValues', async (req, res) => {
	try {
		const data = await exerciseDBO.getDistinctEquipmentArray();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get array of distinct equipment values from our database
 */
router.get('/DistinctEquipmentValues', async (req, res) => {
	try {
		const data = await exerciseDBO.getDistinctEquipmentArray();
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
router.get('/DistinctBodyPartAndEquipmentValues', async (req, res) => {
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
 * Get an array of exercises where exercise[i].bodyPart == query.bodyPart[i];
 * @param query An array of bodyParts.
 * @responds With status(200) and a json of an array of exercises from the database.
 */
router.get('/WithBodyPartQuery/', async (req, res) => {
	try {
		const bodyPartArray = req.query.bodyPart;
		const returnedArray = new Array();
		for (let i = 0; i < bodyPartArray.length; i++) {
			const exercise = await exerciseDBO.getRandomExercisesWithBodyPart(bodyPartArray[i], 1);
			returnedArray[i] = exercise[0];
		}
		res.status(200).json(returnedArray);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Get an array of exercises where (exercise[i].bodyPart == query.bodyPart[i]) && (query.equipment.includes(exercise[i].equipment)) ;
 * @param query An array of bodyPart.
 * @responds With status(200) and a json of an array of exercises from the database.
 */
router.get('/WithBodyPartsAndEquipmentQuery/', async (req, res) => {
	try {
		const bodyPartArray = req.query.bodyPart;
		let equipmentArray = req.query.equipment;
		if (typeof equipmentArray === 'string') {
			equipmentArray = [equipmentArray];
		}
		const returnedArray = new Array();
		const noDuplicateCheckingArray = new Array();
		for (let i = 0; i < bodyPartArray.length; i++) {
			if (bodyPartArray[i] != null) {
				let exercise = await exerciseDBO.getOneExerciseNotInArrayMatchingBodyPartAndEquipment(
					bodyPartArray[i],
					noDuplicateCheckingArray,
					equipmentArray
				);
				returnedArray[i] = exercise[0];
				if (exercise[0] != null || undefined) {
					noDuplicateCheckingArray[i] = exercise[0].id;
				}
			} else {
				console.log('got nothin');
			}
		}
		res.status(200).json(returnedArray);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Test route, wanted to see how long a fairly big number(50) of requests to the db would take.
 */
router.get('/TestResponseTime/', async (req, res) => {
	const nbRequests = 50;
	let arr = new Array();
	for (let i = 0; i < nbRequests; i++) {
		let o = await exerciseDBO.getRandomExercises(1);
		arr.push(o);
	}
	res.status(200).json(arr);
});

module.exports = router;
