const User = require("../models/user");

const saveArticle = (req, res) => {
  const { id, url } = req.body;

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

  User.findByIdAndUpdate(
    id,
    { $push: { articles: url } },
    { new: true },
    (err, user) => {
      if (err)
        res
          .status(400)
          .send({ message: "internal server error. Please try again" });

      res.status(200);
    }
  );
};

module.exports = { saveArticle };
