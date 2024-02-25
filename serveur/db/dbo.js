const express = require('express');
const exerciseModel = require('../models/exercise_model');

module.exports = {
	getDistinctEquipmentArray: async function () {
		const data = await exerciseModel
			.aggregate(
				[
					{
						$group: {
							_id: '$equipment',
							count: { $sum: 1 },
						},
					},
					{ $sort: { count: -1 } },
					{
						$project: {
							_id: 0,
							equipment: '$_id',
						},
					},
				],
				{ maxTimeMS: 60000, allowDiskUse: true }
			)
			.exec();
		return data;
	},
	getDistinctBodyPartArray: async function () {
		const data = await exerciseModel
			.aggregate(
				[
					{
						$group: {
							_id: '$bodyPart',
							count: { $sum: 1 },
						},
					},
					{ $sort: { count: -1 } },
					{
						$project: {
							_id: 0,
							bodyPart: '$_id',
						},
					},
				],
				{ maxTimeMS: 60000, allowDiskUse: true }
			)
			.exec();
		return data;
	},
	getRandomExercises: async function (nbExercises) {
		return await exerciseModel.aggregate([{ $sample: { size: nbExercises } }]).exec();
	},
	getRandomExercisesFromBodyPart: async function (_bodyPart, nbExercises) {
		return await exerciseModel.aggregate([{ $match: { bodyPart: _bodyPart } }, { $sample: { size: 1 } }]).exec();
	},
};
