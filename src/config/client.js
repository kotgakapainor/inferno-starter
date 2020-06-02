// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import '../../core/polyfills'
import '../../core/globals'
import { render } from 'inferno'
import { Provider } from 'inferno-mobx'
import autorun from './autorun'
import createContext from './context'
import State from '../stores/state'
import hydrationConfig from '../helpers/hydrationConfig'
import hydratedPortal from '../helpers/hydratedPortal'


if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  //load service worker
  require('../assets/sw/base')
} else if(process.env.DEV) {
  require('inferno-devtools').initDevTools()
}

const context = createContext(new State(window.__STATE))


// Render our component according to our routes
async function renderApp() {
  const markers = Array.from(document.querySelectorAll('script[type="application/hydration-marker"]'))
  const openPortals = markers && markers.map(marker =>{
    const data = JSON.parse(marker.getAttribute("data-hdata"))
    const ComponentToHydrate = hydrationConfig[data.name]
    return hydratedPortal(<ComponentToHydrate {...data.props}/> , marker)
  })

    render( <Provider { ...context } >
        { openPortals }
    </Provider>, document.getElementById('hydrated-app'))
  }
renderApp()

// Enable hot reloading if available
if (module.hot) {
  module.hot.accept(renderApp)
}

