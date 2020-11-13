const connection = require("../db/data/connection");

exports.fetchUser = (username) => {
  return connection
    .select("*")
    .from("users")
    .where({ username })
};

exports.isValidAuthor = (author) => {
  if (author === undefined) return true
  return connection
  .select("*")
  .from("users")
  .where("username", "=", author)
  .then((authorRes) => {
    return authorRes.length !== 0;
  });
}