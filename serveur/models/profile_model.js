const mongoose = require("mongoose");

const ProgressionModel = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 1,
      max: 600,
    },
  },
  { _id: false }
);

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
      default: "",
    },
    lastName: {
      type: String,
      required: false,
      default: "",
    },
    weight: {
      type: Number,
      required: false,
      default: 0,
    },
    height: {
      type: Number,
      required: false,
      default: "",
    },
    gender: {
      type: String,
      required: false,
      default: "",
    },
    age: {
      type: Number,
      required: false,
      default: 0,
    },
    progression: [ProgressionModel],
    objectifs: [GoalsModel],
  },
  { collection: "profiles" }
);

module.exports = mongoose.model("Profile", ProfileModel);
