'use strict'


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'kodetech100@gmail.com', // generated ethereal user
        pass: '9445296380', // generated ethereal password
    },
});


const sendOtp = ({ reciver, otp }) => {
    const mailOptions = {
        from: 'devagopi101@gmail.com',
        to: reciver,
        subject: 'OTP',
        text: otp,
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