const mongoose = require("mongoose");

const articleSchem = new mongoose.Schema({
  snippet: String,
  web_url: String,
  pop_up: String,
  headling: String,
  author: String,
  _id: String,
  date: Date,
  keyword: String
});

module.exports = mongoose.model("article", articleSchem);
