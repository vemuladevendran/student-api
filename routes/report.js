const { createReport, getReport, getReportByRollNumber,getReportById, deleteReport } = require('../controllers/report/index');

const { checkToken } = require('../services/auth');

module.exports = function ReportRoutes(app) {
    app.post('/api/v1/report', checkToken, createReport);
    app.get('/api/v1/report', checkToken, getReport);
    app.get('/api/v1/report/:rollNumber', getReportByRollNumber);
    app.get('/api/v1/onereport/:id', getReportById);
    app.delete('/api/v1/report/:id', deleteReport);
};




