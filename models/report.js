'use strict'

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ReportSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    ReportTitle: { type: String, require: true },
    ReportDate: { type: Date, require: true },
    studentRollNumber: { type: String, require: true },
    ReportContent: { type: String, require: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, require: true, default: 'Admin' }
});

module.exports = mongoose.model('Report', ReportSchema);
