const express = require("express");
const profileModel = require("../models/profile_model");
const exerciseModel = require("../models/exercise_model");

module.exports = {
  insertProfile: async function (profile) {
    return await profileModel.insertMany(profile);
  },
  getProfile: async function (userID) {
    return await profileModel.find({ _id: userID });
  },
  updateProfile: async function (profile) {
    return await profileModel.updateOne(
      { _id: profile._id },
      {
        $set: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          age: profile.age,
          gender: profile.gender,
          weight: profile.weight,
          height: profile.height,
        },
      },
      { upsert: true }
    );
  },
  upsertExercisePlan: async function (userID, exercisePlan) {
    const profile = await profileModel.findById(userID).exec();
    const isPlanExist = await profileModel.find({ _id: userID, "exercisePlans.name": { $eq: exercisePlan.name } }).exec();
    if (isPlanExist.length > 0) {
      await profileModel.findOneAndUpdate(
        { _id: userID, "exercisePlans.name": { $eq: exercisePlan.name } },
        { $set: { "exercisePlans.$": exercisePlan } }
      );
      console.log("gungus");
    } else {
      profile.exercisePlans.push(exercisePlan);
      console.log("bungus");
      await profile.save();
    }
    //If this works the exercise ids we inserted are good.
    const test = await profileModel.findById(userID).populate("exercisePlans.exercises");
    return;
  },
  getExercisePlan: async function (userID, exercisePlanName) {
    const profile = await profileModel
      .find({ _id: userID, "exercisePlans.name": { $eq: exercisePlanName } }, { _id: 0, exercisePlans: "$exercisePlans" })
      .populate("exercisePlans.exercises");
    let plans = profile[0].exercisePlans;
    let exercisePlan;
    plans.forEach((element) => {
      if (element.name == exercisePlanName) {
        exercisePlan = element;
      }
    });
    console.log(exercisePlan);
    return exercisePlan;
  },
  getExercisePlanNames: async function (userID) {
    return await profileModel
      .aggregate([
        {
          $match: {
            _id: userID,
          },
        },
        {
          $unwind: "$exercisePlans",
        },
        {
          $project: {
            _id: 0,
            name: "$exercisePlans.name",
          },
        },
      ])
      .exec();
  },
};
