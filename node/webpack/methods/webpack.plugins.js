// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (config) => {
    let isdevelop = process.env.NODE_ENV === 'production' ? false : true;
    
    let copyfile = [
        { from: 'src/assets/shader', to: 'assets/shader'}
    ];
    // let copyfile = [
    //     { from: 'src/assets/texture', to: 'assets/texture'},
    //     { from: 'src/assets/model', to: 'assets/model'},
    //     { from: 'src/assets/shader', to: 'assets/shader'},
    //     { from: 'src/libs', to:  'libs'},
    //     { from: threefrom, to: 'libs/threejs/three.js' }
    // ];

    let plugins = [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(copyfile),
        new ManifestPlugin()
    ];

    if (config.chunks) {
        for (let i = 0; i < config.chunks.length; ++i) {
            // console.log(config.chunks[i]);
            plugins.push(new HtmlWebpackPlugin({
                filename: `${config.chunks[i]}.html`,
                chunks: [config.chunks[i]]
            }));
        } 
    }

    return plugins;
    
};