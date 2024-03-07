const mongoose = require("mongoose");

const ProgressionModel = new mongoose.Schema({
  date: Date,
  weight: Number,
});

const GoalsModel = new mongoose.Schema({});

const ProfileModel = new mongoose.Schema(
  {
    auth_id: {
      type: String,
      required: true,
    },
    poids: {
      type: String,
      required: false,
    },
    taille: {
      type: String,
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
