const mongoose = require('mongoose');

const ExerciseModel = new mongoose.Schema(
	{
		bodyPart: {
			type: String,
			required: true,
		},
		equipment: {
			type: String,
			required: true,
		},
		gifUrl: {
			type: String,
			required: true,
		},
		id: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		target: {
			type: String,
			required: true,
		},
		secondaryMuscles: {
			type: Array,
			required: true,
		},
		instructions: {
			type: Array,
			required: true,
		},
	},
	{ collection: 'exercises' }
);

module.exports = mongoose.model('Exercise', ExerciseModel);
