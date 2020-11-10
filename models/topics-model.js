const connection = require("../db/data/connection");

exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then((topicsRes) => {
      // console.log(res);
      return topicsRes;
    });
};
