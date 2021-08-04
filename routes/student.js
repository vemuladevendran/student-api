const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/student/index');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/students' })

module.exports = function studentRoutes(app) {
    app.post('/api/v1/student',upload.single('photo'),createStudent);
    app.get('/api/v1/student', getStudents);
    app.get('/api/v1/student/:id', getStudentById);
    app.put('/api/v1/student/:id', updateStudent);
    app.delete('/api/v1/student/:id', deleteStudent);
};


