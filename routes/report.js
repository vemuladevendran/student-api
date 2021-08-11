const { createReport, getReport, getReportByRollNumber, deleteReport } = require('../controllers/report/index');

const { checkToken } = require('../services/auth');

module.exports = function ReportRoutes(app) {
    app.post('/api/v1/report', checkToken, createReport);
    app.get('/api/v1/report', checkToken, getReport);
    app.get('/api/v1/report/:rollNumber', checkToken, getReportByRollNumber);
    app.delete('/api/v1/report/:id', checkToken, deleteReport);
};




