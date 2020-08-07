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

module.exports = { saveArticle };
