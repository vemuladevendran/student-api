'use strict'

const Users = require('../models/users');
const otpGenerator = require('otp-generator');
const Otp = require('../models/otp');


const generateOtp = async (id) => {
    try {
        const otpDoc = await Otp.create({
            otp: otpGenerator.generate(6, { upperCase: false, alphabets: false, specialChars: false }),
            userId: id,
        });

        return otpDoc.otp;
    } catch (error) {
        console.error(error);
    }
};

const verifyOtp = async (id, otp) => {

    try {
        const otpObj = await Otp.findOne({ userId: id });
        // console.log(otpObj)
        if (!otpObj) {
            console.log('Invalid Link')
        };

        if (otpObj.otp === otp) {
            // exceute
            const result = await Users.findOneAndUpdate(id, { isEmailVerified: true }, { new: true });
            const removeOtp = await Otp.findOneAndRemove(id);
        };

    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    generateOtp,
    verifyOtp
}