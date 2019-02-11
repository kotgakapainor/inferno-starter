const webpack = require('webpack')
const base = require('./webpack.base.js')
const merge = require('webpack-merge')

// Merge with base configuration
//-------------------------------
module.exports = merge(base, {
    mode: 'production',
    cache: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.DEV': false,
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
})