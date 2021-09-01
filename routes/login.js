const { login } = require("../controllers/login/index");
const { studentLogin } = require("../controllers/student-login/index");
module.exports = function loginRoutes(app) {
  app.post("/api/v1/login", login);
  app.post("/api/v1/studentlogin", studentLogin);
};
