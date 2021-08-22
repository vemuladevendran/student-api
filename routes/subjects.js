const { getSubjects } = require('../controllers/subjects/index');



module.exports = function subjectRoutes(app) {
    app.get('/api/v1/subjects/:branch/:semester', getSubjects);
};
