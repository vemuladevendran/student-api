'use strict'

const express = require('express');
const db = require('./db');
const userRoutes = require('./routes/users');
const morgan = require('morgan')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

userRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is listerin on the port ${PORT}`)
});
