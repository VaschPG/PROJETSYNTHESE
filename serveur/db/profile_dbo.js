const express = require("express");
const profile_model = require("../models/profile_model");

module.exports = {
  insertProfile: async function (profile) {
    return await profile_model.insertMany(profile);
  },
  getProfile: async function (userID) {
    return await profile_model.find({ _id: userID });
  },
  updateProfile: async function (profile) {
    return await profile_model.updateOne(
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
};
