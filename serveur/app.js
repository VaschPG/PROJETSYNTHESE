require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//Test thing, decides which database uri to use from our .env
//false=process.env.DATABASE_URI
//true=process.env.TEST_DATABASE_URI
const useTestDB = false;

const dbString = !useTestDB ? process.env.DATABASE_URI : process.env.TEST_DATABASE_URI;
const port = process.env.PORT || 5000;

//--Routers--//
const exercisesRouter = require("./routes/exercise_router");
const profileRouter = require("./routes/profile_router");
const progressionRouter = require("./routes/progression_router");
const goalsRouter = require("./routes/goals_router");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/exercise/", exercisesRouter);
app.use("/api/profile/", profileRouter);
app.use("/api/progression/", progressionRouter);
app.use("/api/goals/", goalsRouter);

mongoose.connect(dbString);
const db = mongoose.connection;
db.on("connected", () => console.log("connected to database"));
db.on("error", (error) => console.error(error));

app.listen(port, () => console.log("server started on port:" + port));

module.exports = app;
