// extract any functions you are using to manipulate your data, into this file
exports.formatDates = (array) => {
  const newArray = [];
  array.forEach((obj) => {
    const objCopy = { ...obj };
    objCopy.created_at = new Date(objCopy.created_at);
    newArray.push(objCopy);
  });
  return newArray;
};

exports.formatAuthor = (array) => {
  return array.map((obj) => {
    const objCopy = { ...obj };
    objCopy.author = objCopy.created_by;
    delete objCopy.created_by;
    return objCopy;
  });
};
