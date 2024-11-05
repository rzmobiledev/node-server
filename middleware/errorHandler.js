const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    res.status(500).send(err.message);
}

module.exports = errorHandler;