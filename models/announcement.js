"use strict";

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const AnnouncementSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, unique: true },
    announcementTitle: { type: String, require: true },
    urlText: { type: Date },
    url: { type: String },
    announcementContent: { type: String, require: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, require: true, default: "Admin" },
  },
  {
    timestamps: true,
  }
);

AnnouncementSchema.index({ createdAt: 1 }, { expireAfterSeconds: 432000 });

module.exports = mongoose.model("Announcement", AnnouncementSchema);
