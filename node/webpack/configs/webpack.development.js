
const GetPath = require('../../utils/GetAbsolutePath.js');
const PORT = 4000;
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        // lazy: true,
        open: true,
        openPage: 'home.html',
        overlay: true,
        port: PORT,
        host: '0.0.0.0',
        contentBase: GetPath('./dist'),
        writeToDisk: true
    }
};