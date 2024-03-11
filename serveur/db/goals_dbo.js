const profileModel = require("../models/profile_model");
const mongoose = require("mongoose");

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
          $unwind: "$goals",
        },
        {
          $project: {
            _id: "$goals._id",
            text: "$goals.text",
            status: "$goals.status",
          },
        },
      ])
      .exec();
  },

  insertOne: async function (userID, insertedGoal) {
    const goalID = new mongoose.Types.ObjectId();
    const goal = { ...insertedGoal, _id: goalID };
    const profile = await profileModel.findById(userID);
    profile.goals.push(goal);
    const saved = await profile.save();
    if (saved._id != null) {
      return goal;
    } else {
      return { message: "Error while inserting goal" };
    }
  },

  removeOne: async function (userID, goalID) {
    return await profileModel.findOneAndUpdate({ _id: userID }, { $pull: { goals: { _id: goalID } } });
  },
};
