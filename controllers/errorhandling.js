const handlePSQLErrors = (error, req, res, next) => {
    const badReqCodes = ['22P02']
    if (badReqCodes.includes(error.code)){
        res.status(400).send({msg: "Bad Request"})
    } else {
        next(error);
    }
}

const handleCustomErrors = (error, req, res, next) => {
    if (error.status) {
        res.status(error.status).send({msg: error.msg})
    } else {
        next(error);
    }
}
const handleInternalErrors = (error, req, res, next) => {
    console.log(error)
    res.status(500).send({msg: "Internal Server Error"});
}



const send405 = (req, res, next) => {
    res.status(405).send({msg: "Invalid method"});
}

const send404 = (req, res, next) => {
    res.status(404).send({msg: "Route not found"})
}



module.exports = {handleInternalErrors, handleCustomErrors, handlePSQLErrors, send405, send404};