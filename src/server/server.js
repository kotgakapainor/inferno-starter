import Koa from 'koa'
import bodyParser from 'koa-better-body'
import convert from 'koa-convert'
import favicon from 'koa-favicon'
import koa_helmet from 'koa-helmet'
import routes from './routes'

// middlewares
import context from './middleware/context'
import catcher from './middleware/catcher'
import render from './middleware/render'
import htmlMinifier from 'koa-html-minifier'

// Serve static files
import mount from 'koa-mount'
import serve from 'koa-static'

// config
import config from '../config'

const app = new Koa()

// override koa's undocumented error handler
app.context.onerror = catcher

for (const [k, v] of Object.entries(config.http.static)) {
  app.use(mount(k, serve(v, {
    index: false
  })))
}

//middleware
app.use(favicon(config.http.favicon))
app.use(convert(bodyParser({
  formLimit: '200kb',
  jsonLimit: '200kb',
  bufferLimit: '4mb'
})))

app.use(convert(htmlMinifier({
  collapseWhitespace: true,
  removeComments: true,
  removeEmptyAttributes: true
})))

app.use(context)


// Routes
app.use(routes.routes())
app.use(render)

app.listen(config.http.port, function () {
  console.info('Koa listening on port ' + config.http.port)
})