const path = require('path')
const prodBase = require('./webpack.prod.base')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const sources = (location) => path.join(__dirname, '../../src', location)


const prodConfigServer = merge.smart(prodBase, {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        bundle: [
            path.join(__dirname, '../../src/config/serverAppEntry')
        ]
    },
    output: {
        filename: 'server.bundle.js',
        chunkFilename: '[name].server.bundle.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: [
                        "dynamic-import-node"
                    ],
                    cacheDirectory: true,
                    cacheIdentifier: process.env.NODE_ENV
                }
            },
            include: [sources(''), sources('../core')],
            exclude: /(node_modules|bower_components)/,
        }]
    }
})

module.exports = prodConfigServer