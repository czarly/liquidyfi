const {  DBClass } = require('./Db');


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    DBClass,
    sleep
}