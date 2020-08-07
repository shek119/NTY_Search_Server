const User = require("../models/user");

const saveArticle = (req, res) => {
  const { id, result, q } = req.body;

  // User.findById(id, { articles: { $exists: false } }, () => {
  //   console.log("articles field does not exist");

  //   User.updateOne(
  //     { _id: id },
  //     { $set: { articles: [] } },
  //     { upsert: true },
  //     function (err) {
  //       console.log(err);
  //     }
  //   );
  // });

  // console.log(url);

  console.log(q);

  User.findByIdAndUpdate(
    id,
    { $push: { articles: { ...result, q } } },
    { new: true },
    (err, user) => {
      console.log(user);
      if (err)
        res
          .status(400)
          .send({ message: "internal server error. Please try again" });

      res.status(200);
    }
  );
};

const getArticles = (req, res) => {
  const id = req.query.id;

  User.findById(id, (err, user) => {
    if (err) console.log(err);
    res.status(200).json(user.articles);
  });

  // res.status(200).send({ msg: "sending articles" });
};

const delArticle = (req, res) => {
  const { id, articleId } = req.query;
  console.log(req.query);

  User.findById(id, (err, user) => {
    if (err) console.log(err);
    const newArr = user.articles.filter(
      (ele) => ele._id !== articleId || typeof ele !== "object"
    );
    user.articles = newArr;
    user.save();

    res.status(200);
  });
};

module.exports = { saveArticle, getArticles, delArticle };
