const { createCircular, getCircular, getCircularByBranch, deleteCircular } = require('../controllers/circular/index');

const { checkToken } = require('../services/auth');

module.exports = function circularRoutes(app) {
    app.post('/api/v1/circular', checkToken, createCircular);
    app.get('/api/v1/circular', checkToken, getCircular);
    app.get('/api/v1/circular/:branch', checkToken, getCircularByBranch);
    app.delete('/api/v1/circular/:id', checkToken, deleteCircular);
};


