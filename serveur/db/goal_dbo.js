const goalModel = require("../models/goal_model");

module.exports = {
  getAllGoals: async function (userID) {
    return await goalModel.find({ userID });
  },

  addGoal: async function (userID, goalText) {
    const newGoal = new goalModel({ userID, text: goalText });
    return await newGoal.save();
  },

  removeGoal: async function (goalID) {
    return await goalModel.findByIdAndRemove(goalID);
  },
};