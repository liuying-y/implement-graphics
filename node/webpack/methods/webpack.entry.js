module.exports = (chunkList) => {
    let result = {};
    for (let i = 0 ; i < chunkList.length; ++ i) {
        result[chunkList[i]] = `./src/pages/${chunkList[i]}/index.js`;
    }
    return result;
}