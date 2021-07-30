const {updatePassword, forgetPassword, verifyForgetPassword} = require('../controllers/password/index');

module.exports = function passwordRoutes(app) {
    app.post('/api/v1/updatepassword', updatePassword);
    app.post('/api/v1/forgetpassword', forgetPassword);
    app.post('/api/v1/verifyforgetpassword', verifyForgetPassword);
};