"use strict";

const Announcement = require("../../models/announcement");
const Users = require("../../models/users");

// create Announcement
const createAnnouncement = async (req, res) => {
  try {
    const creatingUser = await Users.findOne({ id: req.query.id });
    if (!creatingUser) {
      return res.status(400).json("Invalid details");
    }

    req.body.createdBy = creatingUser.firstName;

    const doc = await Announcement.create(req.body);
    return res.json(doc);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// get circular

const getAnnouncement = async (req, res) => {
  try {
    const result = await Announcement.find({ isDeleted: false }).sort({
      createdAt: "descending",
    });
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// delete circular

const deleteAnnouncement = async (req, res) => {
  try {
    const results = await Announcement.findOneAndUpdate(
      { id: req.params.id },
      { isDeleted: true }
    );
    return res.json("user deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
    u;
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncement,
  deleteAnnouncement,
};
