'use strict'

const Users = require('../../models/users');
const PasswordServe = require('../../services/password');
const otpServe = require('../../services/otp-generate');
const mailServe = require('../../services/email');


// update password

const updatePassword = async (req, res) => {
    try {
        const user = await Users.findOne({ isDeleted: false, email: req.prams.email });
        // checking password
        if (!user) {
            console.error('user not found');
            return res.status(400).json({ message: 'Invalid Details' });
        };

        //  checking password
        const isPasswordMatch = await PasswordServe.verify(req.body.password, user.password);

        if (!isPasswordMatch) {
            console.error('password wrong');
            return res.status(400).json({ message: 'Invalid Details' });
        };

        const result = await Users.findOneAndUpdate(
            // checking user
            {
                id: user.id,
            },
            req.body.password, { new: true });
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
};

// forget password
const forgetPassword = async (req, res) => {
    const user = await Users.findOne({ email: req.body.email, isDeleted: false });
    // cheaking user
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }

    // generate otp
    const otp = await otpServe.generateOtp(req.body.id);

    //  sending forgetpassword mail

    mailServe.sendOtp({ reciver: req.body.email, otp: `http://localhost:3000/api/v1/otp/forgetpassword/${user.id}/${otp}` });

    return res.status(200).json({ message: 'forget password request as send your mail id' })

};

//  verify otp and change password

const verifyForgetPassword = async (req, res) => {
    try {
        // verifying otp
        await otpServe.verifyOtp(req.params.id, req.paramas.otp);

        //  updating password
        await Users.findOneAndUpdate({ id: req.prams.id, isDeleted: false }, req.body, { new: true });

        return res.status(200).json({ message: 'password reset was successfully complected' })
    } catch (error) {
        return res.status(500).json({ message: message.error });
    }
}




module.exports = {
    updatePassword,
    forgetPassword,
    verifyForgetPassword,
}

