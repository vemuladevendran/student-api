const { createUser, updateUser, deleteUser, getUsers, getUserById, verifyUser } = require('../controllers/users');

module.exports = function userRoutes(app) {
    app.post('/api/v1/users', createUser);
    app.get('/api/v1/users', getUsers);
    app.get('/api/v1/users/:id', getUserById);
    app.put('/api/v1/users/:id', updateUser);
    app.delete('/api/v1/users/:id', deleteUser);
    app.get('/api/v1/otp/:id/:otp', verifyUser);
};