// webpack config entry

const Merge = require('webpack-merge');
let commonConfig = require('./configs/webpack.common.js');

console.log('environment-----', process.env.NODE_ENV);

let finalConfig = require(`./configs/webpack.${process.env.NODE_ENV || 'development'}.js`);

module.exports = Merge(commonConfig, finalConfig);


