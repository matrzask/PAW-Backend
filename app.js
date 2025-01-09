require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var connectDB = require('./config/db');

var availabilityRouter = require('./routes/availabilityRoute');
var doctorRouter = require('./routes/doctorRoute');
var absenceRouter = require('./routes/absenceRoute');
var consultationRouter = require('./routes/consultationRoute');

var app = express();

connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/availability', availabilityRouter);
app.use('/doctor', doctorRouter);
app.use('/absence', absenceRouter);
app.use('/consultation', consultationRouter);

module.exports = app;
