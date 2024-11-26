const path = require('path');
const fs = require('fs');
function getChunkList() {
    // console.log(getLocation('src/pages'));
    chunkList = fs.readdirSync(getLocation('src/pages'));
    // fs.writeFileSync(getLocation('log'), chunkList.toString());
    return chunkList;
}

function getLocation(str) {
    return path.resolve(process.env.PWD, str);
}

module.exports = getChunkList();