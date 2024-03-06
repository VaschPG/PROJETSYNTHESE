const progressionModel = require("../models/progression_model");

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
  getInitialWeight: async function (userID) {
    return await progressionModel.aggregate([
      {
        $match: {
          userIdentifier: 1,
        },
      },
      {
        $unwind: "$progression",
      },
      {
        $sort: {
          "progression.date": 1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 0,
          date: "$progression.date",
          weight: "$progression.weight",
        },
      },
    ]);
  },
  getLatestWeight: async function (userID) {
    return await progressionModel.aggregate([
      {
        $match: {
          userIdentifier: 1,
        },
      },
      {
        $unwind: "$progression",
      },
      {
        $sort: {
          "progression.date": -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 0,
          date: "$progression.date",
          weight: "$progression.weight",
        },
      },
    ]);
  },
};
