const { login } = require('../controllers/login');

module.export = function loginRouts(app) {
    app.post('/api/v1/login', login);
}