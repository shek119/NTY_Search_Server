const express = require("express");
const router = express.Router();

const { saveArticle } = require("../controllers/user");

router.post("/article/save", saveArticle);

module.exports = router;
