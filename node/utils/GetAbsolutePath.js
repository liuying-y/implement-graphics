const path = require('path');
module.exports = (str) => {
    return path.resolve(process.env.PWD, str);
};