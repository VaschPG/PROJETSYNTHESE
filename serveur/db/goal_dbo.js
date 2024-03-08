const GoalModel = require("../models/goal_model");

module.exports = {
  getAllGoals: async function (userID) {
    return await GoalModel.find({ userID });
  },
  addGoal: async function (userID, goal) {
    const newGoal = new GoalModel({ userID, goal });
    return await newGoal.save();
  },
  removeGoal: async function (goalID) {
    return await GoalModel.findByIdAndRemove(goalID);
  },

};