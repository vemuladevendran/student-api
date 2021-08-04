'use strict'

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const StudentSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    firstName: { type: String, require: true },
    lastname: { type: String, require: true },
    photo: { type: String, trim: true},
    phoneNumber: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    branch: { type: String, require: true },
    yearOfStuding: { type: String, require: true },
    examNumber: { type: String, require: true, unique: true },
    rollNumber: { type: String, require: true, unique: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', StudentSchema);
