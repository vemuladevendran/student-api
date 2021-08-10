'use strict'

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const StudentSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    photo: { type: String, trim: true },
    title: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    gender: { type: String, require: true },
    dob: { type: String, require: true },
    mobileNumber: { type: String, require: true },
    fatherName: { type: String, require: true },
    motherName: { type: String, require: true },
    address: { type: String, require: true },
    yearOf10: { type: String, require: true },
    yearOf12: { type: String, require: true },
    markPercentageOf10: { type: String, require: true },
    markPercentageOf12: { type: String, require: true },
    nameOf10School: { type: String },
    nameOf12School: { type: String },
    yearOfCollegeJoined: { type: String },
    currentStudingyear: { type: String, require: true },
    rollNumber: { type: String, require: true },
    examNumber: { type: String, require: true },
    branch: { type: String, require: true },
    section: { type: String, require: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastUpdate: { type: Date, default: Date.now },
    createdBy: { type: String, require: true, default: 'Admin' }
});

module.exports = mongoose.model('Student', StudentSchema);
