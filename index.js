require('@babel/register')
require('isomorphic-fetch')

/**
 * Bootstrap core and webpack
 */
require('./core/polyfills')
if(!process.env.SERVER) require('./core/compile')

/**
 * Bootstrap our server if needed
 */
if (['production', 'staging'].includes(process.env.NODE_ENV) && process.env.SERVER  || process.env.DEV ) {
    require('./src/server/server')
}