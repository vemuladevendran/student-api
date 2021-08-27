'use strict'

const express = require('express');
const db = require('./db');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const studentRoutes = require('./routes/student');
const passwordRoutes = require('./routes/password');
const circularRoutes = require('./routes/circular');
const ReportRoutes = require('./routes/report');
const marksRoutes = require('./routes/marks');
const subjectRoutes = require('./routes/subjects');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());
app.use('/static/students', express.static('uploads/students'));

userRoutes(app);
loginRoutes(app);
studentRoutes(app);
passwordRoutes(app);
circularRoutes(app);
ReportRoutes(app);
marksRoutes(app);
subjectRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listerin on the port ${PORT}`)
});
