const path = require('path')
const prodBase = require('./webpack.prod.base')
const merge = require('webpack-merge')
const sources = (location) => path.join(__dirname, '../../src', location)
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const prodConfigClient = merge.smart(prodBase , {
    target: 'web',
    entry: {
        bundle: [
            path.join(__dirname, '../../src/config/client')
        ]
    },
    output: {
        publicPath: '/build/',
        path: path.join(__dirname, '../../build'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import'
                    ],
                    cacheDirectory: true
                }
            },
            include: [sources(''), sources('../core')],
            exclude: /(node_modules|bower_components|build)/,
        },
        {
            test: /\.(css|scss)(\?.+)?$/,
            use: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader'},
                { loader: 'postcss-loader'},
                { loader: 'sass-loader'}
            ]
        }]
    },

    optimization: {
        splitChunks: {
          maxAsyncRequests: 20, //for http/2
          maxInitialRequests: 20, //for http/2
        }
    },

    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].[hash].css',
        }),
        new ManifestPlugin({
            fileName: 'build-manifest.json'
        }),
        new SWPrecacheWebpackPlugin({
            cacheId: 'starter-cache',
            filename: 'service.js',
            staticFileGlobs: [
                'build/**.*',
            ],
            mergeStaticsConfig: true,
            staticFileGlobsIgnorePatterns: [/\.map$/, /build\/service\.js$/, /build-manifest\.json$/], // use this to ignore sourcemap files 
            minify: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardDuplicates: {
                    removeAll: true
                },
                discardComments: {
                    removeAll: false
                },
                zindex: false
            },
            canPrint: true
        }),
        new CompressionPlugin({
            filename: "[path].gz[query]",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
})

module.exports = prodConfigClient