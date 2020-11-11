const handlePSQLErrors = (error, req, res, next) => {
    //console.log(error)
    const badReqCodes = ['22P02']
    if (badReqCodes.includes(error.code)){
        res.status(400).send({msg: "Bad Request"})
    } else {
        next(error);
    }
}


const send405 = (req, res, next) => {
    res.status(405).send({msg: "Invalid method"});
}

const send404 = (req, res, next) => {
    res.status(404).send({msg: "Route not found"})
}

const handleInternalErrors = (req, res, next) => {
    res.status(500).send({msg: "Internal Server Error"});
}

module.exports = {handleInternalErrors, handlePSQLErrors, send405, send404};