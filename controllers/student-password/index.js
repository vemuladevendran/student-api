"use strict";

const PasswordServe = require("../../services/password");
const otpServe = require("../../services/otp-generate");
const mailServe = require("../../services/email");
const Student = require("../../models/student");

// update password

const updateStudentPassword = async (req, res) => {
  try {
    const student = await Student.findOne({
      isDeleted: false,
      id: req.params.id,
    });
    // checking password
    if (!student) {
      console.error("student not found");
      return res.status(400).json({ message: "Invalid Details" });
    }

    //  checking password
    const isPasswordMatch = await PasswordServe.verify(
      req.body.oldPassword,
      student.password
    );

    if (!isPasswordMatch) {
      console.error("password wrong");
      return res.status(400).json({ message: "Incorrect Password" });
    }

    req.body.newPassword = await PasswordServe.hash(req.body.newPassword);

    const result = await Student.findOneAndUpdate(
      // checking user
      {
        id: student.id,
      },
      { password: req.body.newPassword },
      { new: true }
    );
    return res.json("password updated successfully");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// forget password
const forgetStudentPassword = async (req, res) => {
  try {
    const rollNumber = (req.body.rollNumber).toUpperCase();
    const student = await Student.findOne({
      rollNumber: rollNumber,
      isDeleted: false,
    });
    // cheaking user
    if (!student) {
      return res.status(400).json({ message: "student not found" });
    }

    // generate otp
    const otp = await otpServe.generateOtp(student.id);

    //  sending forgetpassword mail

    const otpLink = `https://studentportel-1.web.app/reset-password/${student.id}/${otp}`;
    mailServe.sendOtp({
      reciver: student.email,
      emailContent: `<h1>FORGET PASSWORD LINK</h1><br>
<p>To Reset Your Password Click The Below Reset Button</p><br>
<p>This link is vaild for 5 Minutes only</p><br>
<button type="button" style="padding: 1rem 3rem; background-color: #70b0ed; border:0px; font-weight: bold"><a href="${otpLink}" style="color: white" target="_blank">Reset</a></button>`,
    });
    return res
      .status(200)
      .json({ message: "forget password request is send your mail id" });
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};

//  verify otp and change password

const verifyStudentForgetPassword = async (req, res) => {
  try {
    // verifying otp
    const checkOtp = await otpServe.verifyOtp(req.params.id, req.params.otp);

    console.log(checkOtp);

    if (checkOtp === false) {
      return res.status(400).json({ message: "Invalid Link" });
    }

    req.body.password = await PasswordServe.hash(req.body.password);

    //  updating password
    await Student.findOneAndUpdate(
      { id: req.params.id, isDeleted: false },
      { password: req.body.password },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "password reset was successfully complected" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateStudentPassword,
  forgetStudentPassword,
  verifyStudentForgetPassword,
};
