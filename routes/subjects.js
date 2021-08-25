const { getSubjects } = require('../controllers/subjects/index');

const { checkToken } = require('../services/auth');


module.exports = function subjectRoutes(app) {
    app.get('/api/v1/subjects/:branch/:semester',checkToken, getSubjects);
};
