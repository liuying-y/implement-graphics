
/**
 * get methods
 */

const GetPath = require('../../utils/GetAbsolutePath.js');
const GetPlugins = require('../methods/webpack.plugins.js');

/**
 * get resources
 */
// chunk list
const chunks_list = require('../methods/webpack.chunk.js');

module.exports = {
    // 入口
    entry: require('../methods/webpack.entry.js')(chunks_list),
    // 出口
    output: {
        path: GetPath('./dist'),
        filename: '[name].index.[hash].js',
        chunkFilename: '[id].[hash].js',
        publicPath: '/'
    },
    // 
    mode: process.env.NODE_ENV,
    // 资源加载
    module: {
        rules: [
            {
                test: /\.(babylon|jpg|fx|png)$/, 
                loader: 'url-loader'
            }, {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }],
            }
        ]
    },
    externals: {
        cannon: 'CANNON'
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minChunks: 1
        }
    },
    plugins: GetPlugins({chunks: chunks_list})
};