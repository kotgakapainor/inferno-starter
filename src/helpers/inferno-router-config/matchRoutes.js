//https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config/modules/matchRoutes.js
import { matchPath, Router } from "inferno-router";

function matchRoutes(routes, pathname, /*not public API*/ branch = []) {
  routes.some(route => {
    const match = route.path
      ? matchPath(pathname, route)
      : branch.length
        ? branch[branch.length - 1].match // use parent match
        : Router.computeRootMatch(pathname); // use default "root" match

    if (match) {
      branch.push({ route, match });

      if (route.routes) {
        matchRoutes(route.routes, pathname, branch);
      }
    }

    return match;
  });

  return branch;
}

export default matchRoutes;