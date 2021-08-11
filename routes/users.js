const { createUser, updateUser, deleteUser, getUsers, getUserById, verifyUser } = require('../controllers/users');

const { checkToken } = require('../services/auth');
module.exports = function userRoutes(app) {
    // app.post('/api/v1/users', createUser);
    app.post('/api/v1/users', checkToken, createUser);
    app.get('/api/v1/users', checkToken, getUsers);
    app.get('/api/v1/users/:id', checkToken, getUserById);
    app.put('/api/v1/users/:id', checkToken, updateUser);
    app.delete('/api/v1/users/:id',checkToken, deleteUser);
    app.get('/api/v1/otp/:id/:otp', verifyUser);
};