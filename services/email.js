'use strict'

const nodemailer = require('nodemailer');

// creating nodemailer transporter 

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'kodetech100@gmail.com', // generated ethereal user
        pass: '9445296380', // generated ethereal password
    },
});

//  nodemailer sender

const sendOtp = ({ reciver, otp }) => {
    const mailOptions = {
        from: 'kodetech100@gmail.com',
        to: reciver,
        subject: 'OTP',
        text: otp,
    };

    // nodemailer semdmail to reciver
    transporter.sendMail(mailOptions, function (error, info) {
        console.log(mailOptions);
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