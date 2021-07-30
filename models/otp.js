'use strict'

const mongoose = require('mongoose');

const optSchema = new mongoose.Schema({
    otp: { type: String, require: true },
    userId: { type: String, require: true },
})

optSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model('otp', optSchema);