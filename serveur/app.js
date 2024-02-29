require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const dbString = process.env.DATABASE_URI;
const port = process.env.PORT || 5000;

const exercisesRouter = require('./routes/exercise_router');
const profileRouter = require('./routes/profile_router');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/exercise/', exercisesRouter);
app.use('/api/profile/', profileRouter);

mongoose.connect(dbString);
const db = mongoose.connection;
db.on('connected', () => console.log('connected to database'));
db.on('error', (error) => console.error(error));

app.listen(port, () => console.log('server started on port:' + port));

module.exports = app;
