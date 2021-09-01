'use strict'

const nodemailer = require('nodemailer');

// creating nodemailer transporter 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
        user: 'studentdatabasemanagment@gmail.com', // generated ethereal user
        pass: 'srk.srk.srk', // generated ethereal password
    },
});

//  nodemailer sender

const sendOtp = ({ reciver, otp, emailContent }) => {
    const mailOptions = {
        from: 'studentdatabasemanagment@gmail.com',
        to: reciver,
        subject: 'OTP',
        html: emailContent
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
        transporter.close();
    });
};

module.exports = {
    sendOtp
}
