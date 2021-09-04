const PasswordServe = require("../../services/password");
const Token = require("../../services/token");
const Student = require("../../models/student");

// login
const studentLogin = async (req, res, next) => {
  try {
    // checking email
    const rollNumber = (req.body.rollNumber).toUpperCase();
    const student = await Student.findOne({
      isDeleted: false,
      rollNumber: rollNumber
    });
    if (!student) {
      console.error("student not found");
      return res.status(400).json({ message: "Invalid RollNumber" });
    }
    //  checking password
    const password = (req.body.password);
    const isPasswordMatch = await PasswordServe.verify(
      password,
      student.password
    );

    if (!isPasswordMatch) {
      console.error("password wrong");
      return res.status(400).json({ message: "password wrong" });
    }

    // if student details successfully checked
    //  generating token if details is correct

    const token = Token.generate({
      id: student.id,
      rollNumber: student.rollNumber,
      branch: student.branch,
      section: student.section,
    });
    return res.json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, code: "INTERNAL_ERROR" });
  }
};

module.exports = {
  studentLogin,
};
