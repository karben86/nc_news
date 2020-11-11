const connection = require("../db/data/connection");

exports.fetchUser = (username) => {
  return connection
    .select("*")
    .from("users")
    .where({ username })
};
