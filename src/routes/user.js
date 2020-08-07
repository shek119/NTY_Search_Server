const express = require("express");
const router = express.Router();

const { saveArticle, getArticles, delArticle } = require("../controllers/user");

router.post("/article/save", saveArticle);

router.get("/articles", getArticles);

router.delete("/article", delArticle);

module.exports = router;
