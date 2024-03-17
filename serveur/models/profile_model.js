const { ObjectId } = require("mongodb");
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

const GoalModel = new mongoose.Schema({
  _id: ObjectId,
  text: String,
  status: Boolean,
});

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
    goals: [GoalModel],
    exercisePlans: [
      {
        _id: false,
        name: {
          type: String,
          required: true,
        },
        exercises: [{ type: Number, ref: "Exercise" }],
      },
    ],
  },
  { collection: "profiles" }
);

module.exports = mongoose.model("Profile", ProfileModel);
