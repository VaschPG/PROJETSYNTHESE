const express = require('express');
const exerciseModel = require('../models/exercise_model');

module.exports = {
	getDistinctBodyPartArray: async function () {
		const data = await exerciseModel
			.aggregate([{ $limit: 1500 }, { $sortByCount: '$bodyPart' }, { $project: { _id: 0, bodyPart: '$_id' } }], {
				maxTimeMS: 60000,
				allowDiskUse: true,
			})
			.exec();
		return data;
	},
	getDistinctEquipmentArray: async function () {
		const data = await exerciseModel
			.aggregate([{ $limit: 1500 }, { $sortByCount: '$equipment' }, { $project: { _id: 0, equipment: '$_id' } }], {
				maxTimeMS: 60000,
				allowDiskUse: true,
			})
			.exec();
		return data;
	},
	getRandomExercises: async function (nbExercises) {
		return await exerciseModel.aggregate([{ $sample: { size: nbExercises } }]).exec();
	},
	getRandomExercisesFromBodyPart: async function (_bodyPart, nbExercises) {
		return await exerciseModel.aggregate([{ $match: { bodyPart: _bodyPart } }, { $sample: { size: nbExercises } }]).exec();
	},
	getOneExerciseNotInArrayAndMatchingBodyPartAndEquipment: async function (_bodyPart, idArray, equipmentArray) {
		const data = await exerciseModel.aggregate([
			{
				$match: {
					id: {
						$nin: idArray,
					},
					bodyPart: 'waist',
					equipment: { $in: equipmentArray },
				},
			},
			{
				$limit: 1,
			},
		]);
	},
};
