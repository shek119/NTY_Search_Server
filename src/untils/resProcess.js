const _ = require("lodash");

/**
 * @param: {array} datum
 * return : {array} processed
 */
const NYTJSONProccess = datum => {
  const processed = [];

  datum.forEach(data => {
    const newData = _.pick(data, ["snippet", "web_url"]);

    data["multimedia"].forEach(item => {
      if (item.subtype === "popup") {
        newData.popup = item.url;
      }
    });
    newData.headline = data.headline.main;
    newData.author = data.byline.original;
    newData._id = data._id;
    newData.date = data.pub_date;

    processed.push(newData);
  });

  return processed;
};

module.exports = { NYTJSONProccess };
