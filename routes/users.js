const { createUser, login, updateUser, deleteUser } = require('../controllers/users')

module.exports = function userRoutes(app) {
    app.post('/api/v1/users', createUser);
    app.post('/api/v1/login', login);
    app.put('/api/v1/users/:id', updateUser);
    app.delete('/api/v1/users/:id', deleteUser);
};