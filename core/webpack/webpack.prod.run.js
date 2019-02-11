const webpack = require('webpack')
const prodConfigClient = require('./webpack.prod.client')
const prodConfigServer = require('./webpack.prod.server')


const clientCompiler = webpack(prodConfigClient)
clientCompiler.run(function (err, stats) {
    if (err) throw err

    // Output stats
    console.log(stats.toString({
        colors: true,
        hash: false,
        chunks: false,
        version: false,
        children: false,
        chunkModules: false,
        modules: false
    }))

    // Write a stats.json for the webpack bundle visualizer
    //writeWebpackStats(stats)

    if (stats.hasErrors()) {
        console.log(stats.compilation.errors.toString())
    }
    console.log('Finished compiling client bundle')
})

const serverCompiler = webpack(prodConfigServer)
serverCompiler.run(function (err, stats) {
    if (err) throw err

    // Output stats
    console.log(stats.toString({
        colors: true,
        hash: false,
        chunks: false,
        version: false,
        children: false,
        chunkModules: false,
        modules: false
    }))

    // Write a stats.json for the webpack bundle visualizer
    //writeWebpackStats(stats)

    if (stats.hasErrors()) {
        console.log(stats.compilation.errors.toString())
    }
    console.log('Finished compiling server bundle')
})