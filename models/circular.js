'use strict'

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CircularSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    circularTitle: { type: String, require: true },
    circularDate: { type: Date, require: true },
    circularFor: { type: String, require: true },
    circularContent: { type: String, require: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, require: true, default: 'Admin' }
});

module.exports = mongoose.model('Circular', CircularSchema);
