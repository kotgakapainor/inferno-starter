import Router from 'koa-router'
import * as data from './routes/data'

const router = new Router()
    router.get('/get-stuff', data.getStuffFromServer)

//server side router
// see https://github.com/nightwolfz/inferno-starter/blob/master/server/routes.js for examples

export default router