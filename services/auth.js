const verifyToken = require('../services/token')


const checkAuthToken = (req, res, next) => {
    if (req.headers.authorization) {
       const token =  verifyToken.verifyToken(req.headers.authorization);
    //    console.log(token)
        next()
    } else {
        res.status(400).json({ message: 'Failed to authenticate token' })
    }
}


module.exports = {
    checkToken: checkAuthToken,
}