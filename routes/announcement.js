const {
  createAnnouncement,
  getAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcement/index");

const { checkToken } = require("../services/auth");

module.exports = function announcementRoutes(app) {
  app.post("/api/v1/announcement", checkToken, createAnnouncement);
  app.get("/api/v1/announcement", checkToken, getAnnouncement);
  app.delete("/api/v1/announcement/:id", checkToken, deleteAnnouncement);
};
