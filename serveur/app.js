var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require ('cors');

const mongoString = "mongodb+srv://Gabriel:Password12345@cluster0.qm5dbem.mongodb.net/PlanificateurDB";
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testGabeRouter = require('./routes/testGabe')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testGabe', testGabeRouter);

mongoose.connect(mongoString);
const db = mongoose.connection;
db.on('connected', () => console.log('connected to database'));
db.on('error', (error) => console.error(error));

app.listen(3500, () => console.log('server started'));

module.exports = app;
