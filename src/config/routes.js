import Layout from '../components/layout/Layout'
import { generateAsyncRouteComponent } from '../helpers/irv4Helpers'

/**
 * Routes are defined here.
 * @param {object} - stores
 * @returns {object}
 */

export default [{
  component: Layout,
  path: parentRoute => `${parentRoute}/`,
  routes: [
    {
      path: parentRoute => `${parentRoute}/`,
      exact: true,
      component: generateAsyncRouteComponent({
        loader: () => import( /* webpackChunkName: "home" */ '../pages/Home'),
      }),
    }
  ],
}]