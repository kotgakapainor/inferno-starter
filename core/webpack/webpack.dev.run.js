const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const devConfigClient = require('./webpack.dev.client')

const clientCompiler = webpack(devConfigClient)
const port = 2002
new WebpackDevServer(clientCompiler, {
    publicPath: devConfigClient.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
    },
    https: false,
    hot: true,
    compress: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false
    },
    stats: {
        colors: true, //set to true for more logging
        hash: false,
        timings: true,
        version: false,
        chunks: false,
        modules: false,
        children: true,
        chunkModules: false,
        excludeAssets: /([a-z,0-9]*\.(woff2?|eot)|(\.map))/ //hide font files from displaying
    }
}).listen(port, 'localhost', function (err, result) {
    if (err) return console.error('webpack:error', err);

    console.warn('Webpack Dev Server: Running on port ' + port)
})