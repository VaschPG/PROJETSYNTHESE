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
    poids: {
      type: Number,
      required: false,
    },
    taille: {
      type: Number,
      required: false,
    },
    sexe: {
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
