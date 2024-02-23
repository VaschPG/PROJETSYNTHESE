const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require ('cors');

const dbString = process.env.DATABASE_URI
const port = process.env.PORT || 5000;

const testGabeRouter = require('./routes/testGabe')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/testGabe', testGabeRouter);

mongoose.connect(mongoString);
const db = mongoose.connection;
db.on('connected', () => console.log('connected to database'));
db.on('error', (error) => console.error(error));

app.listen(3000, () => console.log('server started'));

module.exports = app;
