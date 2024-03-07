const mongoose = require("mongoose");

const ProgressionModel = new mongoose.Schema({
  progression: [
    {
      date: Date,
      weight: Number,
    },
  ],
});

module.exports = mongoose.model("Progression", ProgressionModel);
