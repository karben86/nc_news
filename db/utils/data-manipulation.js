// extract any functions you are using to manipulate your data, into this file
exports.formatDates = (array) => {
    const newArray = [];
    array.forEach((obj) => {
        const objCopy = {...obj};
        objCopy.created_at = new Date(objCopy.created_at);
        newArray.push(objCopy);
    })
    return newArray;
}