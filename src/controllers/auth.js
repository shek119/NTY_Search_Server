const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signUp = (req, res) => {
  const { email, username, password } = req.body;
  console.log("new account registering");
  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10)
  });

  user.save((err, user) => {
    if (err) return res.status(500).send({ message: err });

    res.send({ message: "Registered successfully" });
  });
};

const signIn = (req, res) => {
  const { username, password } = req.body;
  const expiresIn = 86400;

  User.findOne({ username }).exec((err, user) => {
    if (err) return res.status(500).send({ message: err });

    const isPwValid = bcrypt.compareSync(password, user.password);

    if (!isPwValid)
      return res
        .status(401)
        .send({ message: "Username and Password does not match" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_PR_KEYS, {
      expiresIn
    });

    // console.log(token);

    res.status(200).send({ accessToke: token, id: user._id, expiresIn });
  });
};

module.exports = { signUp, signIn };
