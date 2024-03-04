const mongoose = require('mongoose');

const ProgressionModel = new mongoose.Schema(
	{
		userIndentifier: Number,
		progression: [
			{
				date: Date,
				weight: Number,
			},
		],
	},
	{ collection: 'temp_progression' }
);

module.exports = mongoose.model('Progression', ProgressionModel);
