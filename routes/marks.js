const { createMarks, getMarks,getMarksByRollnumber, updateMarks, deleteMarks } = require('../controllers/marks/index');

const { checkToken } = require('../services/auth');

module.exports = function marksRoutes(app) {
    app.post('/api/v1/marks', checkToken, createMarks);
    app.get('/api/v1/marks', checkToken, getMarks);
    app.get('/api/v1/marks/:rollNumber', getMarksByRollnumber);
    app.put('/api/v1/marks', checkToken, updateMarks);
    app.delete('/api/v1/marks/:id', checkToken, deleteMarks);
};
