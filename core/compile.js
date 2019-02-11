const isProd = ['production', 'staging'].includes(process.env.NODE_ENV)
const isDev = process.env.NODE_ENV === 'development' || !isProd

if (isProd) {
    require('./webpack/webpack.prod.run')
}

if (isDev) {
    process.env.DEV = true
    require('./webpack/webpack.dev.run')
}