const express = require("express");
const Router = express.Router();

const User = require("../models/user");

Router.post("/article/save", (req, res) => {
  const { id, url } = req.body;

  User.findById(id).exec((err, user) => {
    console.log(user);
  });
});

module.exports = Router;
