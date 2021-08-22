const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent, getStudentsByBranchAndYear } = require('../controllers/student/index');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/students' })

module.exports = function studentRoutes(app) {
    app.post('/api/v1/student/:id',upload.single('photo'),createStudent);
    app.get('/api/v1/student', getStudents);
    app.get('/api/v1/student/:id', getStudentById);
    app.get('/api/v1/student/:branch/:currentStudingyear', getStudentsByBranchAndYear);
    app.put('/api/v1/student/:id',upload.single('photo'),updateStudent);
    app.delete('/api/v1/student/:id', deleteStudent);
};


