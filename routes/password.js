const {updatePassword, forgetPassword, verifyForgetPassword} = require('../controllers/password/index');
const {updateStudentPassword, forgetStudentPassword, verifyStudentForgetPassword} = require('../controllers/student-password/index');

module.exports = function passwordRoutes(app) {
    app.post('/api/v1/updatepassword/:id', updatePassword);
    app.post('/api/v1/forgetpassword', forgetPassword);
    app.post('/api/v1/verifyforgetpassword/:id/:otp', verifyForgetPassword);
    // student routs

    app.post('/api/v1/updatestudentpassword/:id', updateStudentPassword);
    app.post('/api/v1/forgetstudentpassword', forgetStudentPassword);
    app.post('/api/v1/verifystudentforgetpassword/:id/:otp', verifyStudentForgetPassword);
};