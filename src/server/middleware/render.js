import fs from 'fs'
import { resolve } from 'path'
import { readFileSync } from 'jsonfile'
import { renderToStaticMarkup } from 'inferno-server'
import config from '../../config'

const serverEntry = process.env.DEV ? require('../../config/serverAppEntry').default : require('../../../build/server.bundle').default
const manifest = process.env.DEV ? '' : readFileSync(`${__dirname}/../../../build/build-manifest.json`)
const indexHTML = fs.readFileSync(resolve(__dirname, '../../pages/index.html'), 'utf8')

// Server-side render
export default async (ctx, next) => {

  //if we redirect we return early
  if(ctx.status === 301 || ctx.status === 302) return await next()

  const bundleURL = process.env.DEV ? `//localhost:2002` : ''

  //SSR Components
  const serverAppEntry = config.server.SSR ? renderToStaticMarkup(await serverEntry(ctx)) : ''
  const components = serverAppEntry

  //every dynamic change for index.html has to be made here
  ctx.body = indexHTML
    .replace(/{bundleURL}/g, bundleURL)
    .replace(/{title}/g, ctx.context.state.seoTitle)
    .replace(/{description}/g, ctx.context.state.seoDescription)
    .replace('{state}', JSON.stringify(ctx.context.state, null, 0))
    .replace('{children}', components)
    .replace('{bundleJS}', process.env.DEV ? '/build/bundle.js' : manifest['bundle.js'])
    .replace('{bundleCSS}', process.env.DEV ? '/build/bundle.css' : manifest['bundle.css'])
  
    await next()
  }