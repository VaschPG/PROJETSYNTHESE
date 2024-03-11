const profileModel = require("../models/profile_model");

module.exports = {
  getAll: async function (userID) {
    return await profileModel
      .aggregate([
        {
          $match: {
            _id: userID,
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
          $project: {
            _id: 0,
            date: "$progression.date",
            weight: "$progression.weight",
          },
        },
      ])
      .exec();
  },
  getInitialWeight: async function (userID) {
    return await profileModel.aggregate([
      {
        $match: {
          _id: userID,
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
    return await profileModel.aggregate([
      {
        $match: {
          _id: userID,
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
  insertOne: async function (userID, insertedProgression) {
    return await profileModel.findOneAndUpdate(
      { _id: userID, "progression.date": { $ne: insertedProgression.date } },
      { $push: { progression: insertedProgression } }
    );
  },
  removeOne: async function (userID, progressionDate) {
    return await profileModel.findOneAndUpdate({ _id: userID }, { $pull: { progression: { date: progressionDate } } });
  },
};
