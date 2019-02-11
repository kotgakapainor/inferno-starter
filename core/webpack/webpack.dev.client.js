const path = require('path')
const devBase = require('./webpack.dev.base')
const merge = require('webpack-merge')
const sources = (location) => path.join(__dirname, '../../src', location)
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


const devConfigClient = merge.smart(devBase , {
    target: 'web',
    entry: {
        bundle: [
            `webpack-dev-server/client?http://localhost:2002`,
            'webpack/hot/only-dev-server',
            path.join(__dirname, '../../src/config/client')
        ]
    },
    output: {
        publicPath: 'http://localhost:2002/build/',
        libraryTarget: 'var',
        pathinfo: true,
        filename: '[name].js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import'
                    ]
                }
            },
            include: [sources(''), sources('../core')],
            exclude: /(node_modules|bower_components|build)/,
        },
        {
            test: /\.(css|scss)(\?.+)?$/,
            use: [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { sourceMap: true }},
                { loader: 'postcss-loader', options: { sourceMap: true }},
                { loader: 'sass-loader', options: { sourceMap: true }}
            ]
        },]
    }
})

module.exports = devConfigClient