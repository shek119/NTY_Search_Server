const user = require("../models/user");
const validator = require("validator");

const checkEmailUsernameUni = (req, res, next) => {
  if (!validator.isEmail(req.body.email))
    return res.status(400).send({ message: "Please enter a valid email" });
  console.log("verifying sign up");
  user
    .findOne({
      email: req.body.email
    })
    .exec((err, email) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (email) {
        return res.status(400).send({ message: "Email is already in use." });
      }

      user.findOne({ username: req.body.username }).exec((err, username) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (username) {
          res.status(400).send({ message: "Username is already in use." });
          return;
        }
        next();
      });
    });
};

module.exports = { checkEmailUsernameUni };
