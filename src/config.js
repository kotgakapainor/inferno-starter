const path = require('path')
const root = (dir) => path.join(__dirname, '..', dir)


module.exports = {
    http: {
        //favicon: path.join(__dirname, 'assets/favicons/favicon.ico'),
        static: {
            '/build': root('build'),
            '/': root('src/assets'),
            '/service.js' : root('build/service.js')
        },
        port: 2000
    },
    server: {
        SSR: true, // Server side rendering
    }
}