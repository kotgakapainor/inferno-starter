const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const sources = (location) => path.join(__dirname, '../../src', location)

module.exports = {
    entry: ['whatwg-fetch'],
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                include: [sources(''), sources('../core')],
                exclude: /(node_modules|bower_components|build)/,
            },
            {
                test: /\.(jpg|png|svg)(\?.+)?$/,
                loader: 'url-loader?limit=100000',
                include: [sources('assets'), sources('client/components')]
            },
            {
                test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
                loader: 'file-loader',
                include: [sources('assets'), sources('client/components')]
            }
        ]
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        sourcePrefix: '',
        path: path.resolve(__dirname, '../../build')
    },

    resolve: {
        alias: {
            'core': path.join(__dirname, '../'),
            'mobx': path.join(__dirname, '../../node_modules/mobx/lib/mobx.es6.js')
        }
    }
}