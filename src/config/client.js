// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import '../../core/polyfills'
import '../../core/globals'
import { hydrate } from 'inferno-hydrate'
import { Router } from 'inferno-router'
import { Provider } from 'inferno-mobx'
import createBrowserHistory from 'history/createBrowserHistory'
import onEnter from '../../core/onEnter'
import autorun from './autorun'
import createContext from './context'
import State from '../stores/state'
import routes from './routes'
import { convertCustomRouteConfig, ensureReady } from '../helpers/irv4Helpers'
import renderRoutes from '../helpers/inferno-router-config/renderRoutes'

const routeConfig = convertCustomRouteConfig(routes)


if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  //load service worker
  require('../assets/sw/base')
} else if(process.env.DEV) {
  require('inferno-devtools').initDevTools()
}

const context = createContext(new State(window.__STATE))
const history = createBrowserHistory()

// React to changes
autorun(context, history)

// Fetch data on route change
history.listen(() => {
  onRouteUpdate()
})

// Render our component according to our routes
async function renderApp() {
  const isReady = await ensureReady(routeConfig)
  if(isReady) 
    hydrate( <Provider { ...context } >
      <Router history={ history } >
        { renderRoutes(routeConfig, context) }
      </Router> 
    </Provider>, document.getElementById('app'))
}
renderApp()

// Enable hot reloading if available
if (module.hot) {
  module.hot.accept(renderApp)
}


/* 
* Helper
*/
async function onRouteUpdate() {
  const loadedComponent = (await ensureReady(routeConfig)).filter(Boolean)
  // Fetch data on route change
  onEnter(loadedComponent, context) 

}
