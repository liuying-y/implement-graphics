/**
 * 生成场景列表
 * 
 */
const fs = require('fs');
const config = require('../../config/config.json').DEVELOP;
const { isRequired } = require('../utils/RunTimeEnvironmentChecker');

const reg = /\.[^\.]+$/;
function sceneListGenerator() {
    let resultlist = [];
    let direction = config.sceneDir;
    let files = fs.readdirSync(direction, {
        withFileTypes: true,
    });
    // file name filter
    for (let i = 0; i < files.length; ++i) {
        if (fs.statSync(direction + '/' + files[i].name).isDirectory()) {
            continue;
        } else {
            resultlist.push(files[i].name.replace(reg, ''));
        }
    }
    // console.log(resultlist);
    return resultlist;
    
}

function writeSceneListFile() {
    let list = sceneListGenerator(); 
    let result = `
module.exports = {
    getScene: function (scenename) {
        switch (scenename) {`;
    for (let i = 0; i < list.length; ++i) {
        result += `
            case '${list[i]}': return import('../../scenes/${list[i]}.js');`;
    }
    result += `            
        }
    }
};
    `;
    fs.writeFileSync('src/pages/home/scenelist.json', JSON.stringify({list: list}));
    fs.writeFileSync('src/pages/scene/scenelist.js', result);
}

// console.log('----require');
// console.log(__filename, isRequired(__filename))
if (isRequired(__filename)) {
    module.exports = {
        sceneListGenerator: sceneListGenerator
    };
} else {
    writeSceneListFile();
}
