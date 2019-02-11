const path = require('path')
const devBase = require('./webpack.dev.base')
const merge = require('webpack-merge')
const sources = (location) => path.join(__dirname, '../../src', location)


const devConfigServer = merge.smart(devBase, {
    target: 'node',
    entry: {
        bundle: [
            path.join(__dirname, '../../src/config/serverAppEntry')
        ]
    },
    output: {
        filename: 'server.bundle.js',
        chunkFilename: '[name].server.bundle.js',
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
                    compact: false
                }
            },
            include: [sources(''), sources('../core')],
            exclude: /(node_modules|bower_components)/,
        }]
    }
})

module.exports = devConfigServer