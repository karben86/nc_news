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

exports.createTitleRef = (array) => {
  const refObj = {};
  array.forEach((obj) => {
    refObj[obj.title] = obj.article_id;
  });

  return refObj;
};

exports.formatComments = (commentData, titleRef) => {
  return commentData.map(({ belongs_to, ...restOfComments }) => {
    const newComment = { ...restOfComments, article_id: titleRef[belongs_to] };
    return newComment;
  });
};
