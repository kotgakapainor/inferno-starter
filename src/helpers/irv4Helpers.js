//https://github.com/gdborton/rrv4-ssr-and-code-splitting/blob/master/src/rrv4Helpers.jsx
import { Component } from 'inferno'
import matchRoutes from './inferno-router-config/matchRoutes'

/**
 * Returns a new React component, ready to be instantiated.
 * Note the closure here protecting Component, and providing a unique
 * instance of Component to the static implementation of `load`.
 */
export function generateAsyncRouteComponent({ loader, Placeholder }) {
  let component = null
  return class AsyncRouteComponent extends Component {

    constructor() {
      super()
      this.updateState = this.updateState.bind(this)
      this.state = {
        component
      }  
    }
  
    /**
     * Static so that you can call load against an uninstantiated version of
     * this component. This should only be called one time outside of the
     * normal render path.
     */
    static async load() {
      const { default: ResolvedComponent } = await loader()
      return component = ResolvedComponent.default || ResolvedComponent
    }
  
    componentWillMount() {
      AsyncRouteComponent.load().then(this.updateState)
    }
  
    updateState() {
      // Only update state if we don't already have a reference to the
      // component, this prevent unnecessary renders.
      if (this.state.component !== component) {
        this.setState({
          component
        })
      }
    }
  
    render(props, state) {
      const { component: ComponentFromState } = state
      if (ComponentFromState) {
        return <ComponentFromState {...props} />
      }
  
      if (Placeholder) {
        return <Placeholder {...props} />
      }
  
      return null
    }
  }
}


/**
 * First match the routes via react-router-config's `matchRoutes` function.
 * Then iterate over all of the matched routes, if they've got a load function
 * call it.
 *
 * This helps us to make sure all the async code is loaded before rendering.
 */
export async function ensureReady(routeConfig, providedLocation) {
  const matches = matchRoutes(routeConfig, providedLocation || location.pathname);
  return Promise.all(matches.map(async match => {
    const { component } = match.route
    const params = match.match.params
    //if we have an async route we load it and copy the params to it
    if (component && component.load) {
      const loadedComponent = await component.load()
      //append params to component //to have params available in static onEnter Method
      loadedComponent.params = params

      return loadedComponent
    }
    //could happen if we try to load a sync route. in this case we return the "already loaded" component to process the onEnter fn later
    if(component && component.onEnter){
      return component
    }
    return undefined
  }))
}

export function convertCustomRouteConfig(customRouteConfig, parentRoute) {
  return customRouteConfig.map((route) => {
    if (typeof route.path === 'function') {
      const pathResult = route.path(parentRoute || '').replace('//', '/');
      return {
        path: pathResult,
        component: route.component,
        exact: route.exact,
        routes: route.routes ? convertCustomRouteConfig(route.routes, pathResult) : [],
      }
    }
    const pathResult = `${parentRoute}${route.path}`
    return {
      path: pathResult,
      component: route.component,
      exact: route.exact,
      routes: route.routes ? convertCustomRouteConfig(route.routes, pathResult) : [],
    }
  })
}