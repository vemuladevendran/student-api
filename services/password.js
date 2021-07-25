'use strict'

const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = (plainPassword) => {
    return bcrypt.hash(plainPassword, saltRounds);
}

const verifyPassword = (password, passwordHash) => {
    returnbcrypt.compare(password, passwordHash)
}


module.exports = {
    hash: hashPassword,
    password: verifyPassword,
};
