"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const MarksSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  studentId: { type: String, require: true },
  rollNumber: { type: String, require: true },
  studentName: { type: String, require: true },
  subjectsMarks: { type: Object, require: true },
  currentStudingYear: { type: String, require: true },
  examName : {type: String, require: true},
  examNumber: { type: String, require: true },
  branch: { type: String, require: true },
  section: { type: String, require: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, require: true, default: "Admin" }
});

module.exports = mongoose.model("Marks", MarksSchema);
