const { login } = require('../controllers/login');
module.exports = function loginRoutes(app) {
    app.post('/api/v1/login',login);
}