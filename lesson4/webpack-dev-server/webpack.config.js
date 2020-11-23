const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        hot: true
    },
    plugins: [
        new HTMLWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}