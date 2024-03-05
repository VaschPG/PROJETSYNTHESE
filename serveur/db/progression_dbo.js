const progressionModel = require('../models/progression_model');

module.exports = {
	getAllProgression: async function (userID) {
		return await progressionModel
			.aggregate([
				{
					$match: {
						userIdentifier: userID,
					},
				},
				{
					$project: {
						_id: 0,
						progression: 1,
					},
				},
			])
			.exec();
	},
};
