const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('./plugins/assets-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: '/**.js/',

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new AssetsPlugin()
    ],
    devServer: {}
};


