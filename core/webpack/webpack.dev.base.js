const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const base = require('./webpack.base.js')
const merge = require('webpack-merge')


// Merge with base configuration
//-------------------------------
module.exports = merge(base, {
    mode: 'development',
    devtool: 'source-map', // eval eval-cheap-module-source-map source-map
    cache: true,
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'bundle.css',
            chunkFilename: '[id].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, '../../core'),
            path.join(__dirname, '../../build')
        ]),
        new webpack.DefinePlugin({
            'process.env.DEV': true,
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    resolve: {
        // When doing development workflow we want to make sure webpack picks up development build of inferno
        alias: {
            'inferno': path.join(__dirname, '../../node_modules/inferno/dist/index.dev.esm.js'),
            'inferno-server': path.join(__dirname, '../../node_modules/inferno-server/dist/index.dev.esm.js'),
        }
    },
})