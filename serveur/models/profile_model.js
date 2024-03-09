const mongoose = require("mongoose");

const ProgressionModel = new mongoose.Schema(
  {
    date: Date,
    weight: Number,
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
      default: "",
    },
    progression: [ProgressionModel],
    objectifs: [GoalsModel],
  },
  { collection: "profiles" }
);

module.exports = mongoose.model("Profile", ProfileModel);
