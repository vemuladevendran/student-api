const PasswordServe = require('../../services/password');
const Token = require('../../services/token');
const Student = require("../../models/student");


// login
const studentLogin = async (req, res, next) => {

    try {
        // checking email
        const student = await Student.findOne({ rollNumber: req.body.rollNumber });
        if (!student) {
            console.error('student not found');
            return res.status(400).json({ message: 'Invalid RollNumber' });
        };
        //  checking password
        const isPasswordMatch = await PasswordServe.verify(req.body.password, student.password);

        if (!isPasswordMatch) {
            console.error('password wrong');
            return res.status(400).json({ message: 'password wrong' });
        };
      

        // if student details successfully checked 
        //  generating token if details is correct

        const token = Token.generate({ id: student.id, branch: student.branch });
        return res.json({ token: token });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    };
};


module.exports = {
    studentLogin,
};