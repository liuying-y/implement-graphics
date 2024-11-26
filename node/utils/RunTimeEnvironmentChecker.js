/**
 * 运行环境测试
 */
const path = require('path');
const reg = /\.[^\.]+$/;

// 判断脚本是直接运行的还是被require的
function isRequired(filename) {
    return process.argv.join(' ').indexOf(filename.replace(reg, '')) == -1;
;
}

module.exports = {
    isRequired
};