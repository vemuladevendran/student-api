'use strict'

const express = require('express');
const db = require('./db');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());

userRoutes(app);
loginRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is listerin on the port ${PORT}`)
});
