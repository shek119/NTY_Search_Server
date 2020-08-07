const User = require("../models/user");

const saveArticle = (req, res) => {
  const { id, url } = req.body;

  User.findById(id).exec((err, user) => {
    console.log(user);
  });
};

module.exports = { saveArticle };
