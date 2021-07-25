'use strict'

const express = require('express');
const db = require('./db');
const userRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

userRoutes(app);


app.listen(PORT, () => {
    console.log(`server is listerin on the port ${PORT}`)
});
