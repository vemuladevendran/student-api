const { login } = require('../controllers/login');
const { checkToken } = require('../services/auth')
module.exports = function loginRoutes(app) {
    app.post('/api/v1/login', checkToken,login);
}