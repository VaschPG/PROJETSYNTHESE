const mongoose = require("mongoose");

const ProgressionModel = new mongoose.Schema({
  date: Date,
  weight: Number,
});

const GoalsModel = new mongoose.Schema({});

const ProfileModel = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    progression: [ProgressionModel],
    objectifs: [GoalsModel],
  },
  { collection: "profiles" }
);

module.exports = mongoose.model("Profile", ProfileModel);
