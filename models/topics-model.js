const connection = require("../db/data/connection");

exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then((topicsRes) => {
      return topicsRes;
    });
};

exports.isValidTopic = (topic) => {
  if (topic === undefined) return true
  return connection
  .select("*")
  .from("topics")
  .where("slug", "=", topic)
  .then((topicsRes) => {
    return topicsRes.length !== 0;
  });
}
