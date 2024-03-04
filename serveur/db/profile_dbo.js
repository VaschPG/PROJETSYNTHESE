const express = require("express");
const profile_model = require("../models/profile_model");

module.exports = {
  insertProfile: async function (profileID) {
    return await profile_model.insertMany({ auth_id: profileID });
  },
};
