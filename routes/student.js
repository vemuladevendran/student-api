const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/student/index');

module.exports = function studentRoutes(app) {
    app.post('/api/v1/student', createStudent);
    app.get('/api/v1/student', getStudents);
    app.get('/api/v1/student/:id', getStudentById);
    app.put('/api/v1/student/:id', updateStudent);
    app.delete('/api/v1/student/:id', deleteStudent);
};


