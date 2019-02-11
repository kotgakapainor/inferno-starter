//https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config/modules/renderRoutes.js
import { Switch, Route } from "inferno-router"

function renderRoutes(routes, extraProps, switchProps) {
  const renderedRoutes = routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={ props =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
    </Switch>
  ) : null

  return renderedRoutes
}

export default renderRoutes