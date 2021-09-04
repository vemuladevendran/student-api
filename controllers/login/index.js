const Users = require("../../models/users");
const PasswordServe = require("../../services/password");
const Token = require("../../services/token");

// login
const login = async (req, res, next) => {
  try {
    // checking email
    const user = await Users.findOne({
      isDeleted: false,
      email: req.body.email,
    });
    if (!user) {
      console.error("user not found");
      return res.status(400).json({ message: "Invalid Details" });
    }
    //  checking password
    const isPasswordMatch = await PasswordServe.verify(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      console.error("password wrong");
      return res.status(400).json({ message: "Invalid Details" });
    }
    // checking email verified or not
    if (!user.isEmailVerified) {
      console.log("email not verified");
      return res.status(400).json({ message: "Email not verified" });
    }

    // if user details successfully checked
    //  generating token if details is correct

    const token = Token.generate({ id: user.id, isAdmin: user.isAdmin });
    return res.json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, code: "INTERNAL_ERROR" });
  }
};

module.exports = {
  login,
};
