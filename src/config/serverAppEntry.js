import { StaticRouter } from 'inferno-router'
import { Provider } from 'inferno-mobx'
import routes from './routes'
import { convertCustomRouteConfig, ensureReady } from '../helpers/irv4Helpers'
import renderRoutes from '../helpers/inferno-router-config/renderRoutes'
import onEnter from '../../core/onEnter'
const routeConfig = convertCustomRouteConfig(routes)

/* 
Our whole server app is to be consumed as an static bundle, which depends on this entry (prod)
*/

export default async function ServerAppEntry(ctx) {
        const dataLoaded = await loadSSRData(ctx)
        return dataLoaded && <Provider {...ctx.context}>
            <StaticRouter location={ctx.url} context={ctx.context}>
                { renderRoutes(routeConfig, ctx.context ) }
            </StaticRouter>
        </Provider>
}

const loadSSRData = async ctx => {
    //SSR Components
    const loadedComponent = (await ensureReady(routeConfig, ctx.url)).filter(Boolean)
    const dataLoaded = await onEnter(loadedComponent, ctx.context)
    // Fetch data for route
    return dataLoaded
}
 