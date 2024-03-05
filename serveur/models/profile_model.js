const mongoose = require("mongoose");

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
  },
  { collection: "profiles" }
);

module.exports = mongoose.model("Profile", ProfileModel);
