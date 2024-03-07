const express = require("express");
const profile_model = require("../models/profile_model");

module.exports = {
  insertProfile: async function (profile) {
    return await profile_model.insertMany(profile);
  },
};
