const { createUser } = require('../controllers/users')

module.exports = function initRoutes(app) {
    app.get('/api/v1/users', createUser);
};