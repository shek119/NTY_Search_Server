const express = require("express");
const router = express.Router();
const axios = require("axios");
const { NYTJSONProccess } = require("../untils/resProcess");

const baseURL_NYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

/**
 * @params {arr} queries
 * @params {num} page
 *
 * return: json
 */
router.get("/articles", (req, res) => {
  const { q, page } = req.query;
  const queryString = arr => {
    let str = "";

    arr.forEach((item, index) => {
      if (index === arr.length - 1) {
        str += `${item}`;
      } else {
        str += `${item}+`;
      }
    });
    return str;
  };

  console.log(queryString(q));
  axios
    .get(baseURL_NYT, {
      params: {
        q: queryString(q),
        page: page,
        "api-key": process.env.NYT_KEYS
      }
    })
    .then(response => {
      // console.log(response);
      const proccessed = NYTJSONProccess(response.data.response.docs);
      res.send(proccessed);
    })
    .catch(function(error) {
      console.log(error);
    });
});

module.exports = router;
