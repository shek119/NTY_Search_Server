const User = require("../models/user");

const saveArticle = (req, res) => {
  const { id, url } = req.body;
  console.log(req.body);
  User.findById(id, (err, user) => {
    console.log(user);
  });
};

module.exports = { saveArticle };
