/**
 * Go through the mached route and extract the static method
 * @param staticMethod {String}
 * @param components {Object}
 * @param promises {Array}
 * @returns {Object}
 */

function getRoutes(staticMethod, components) {
  const routes = Array.isArray(components) ? components : [components]
  const promises = routes.map(component => {
    return component[staticMethod] && component[staticMethod]
  }).filter(Boolean)
  return promises
}

/**
 * Execute onEnter methods of matched components
 * @returns {Promise}
 */
export default async (routes, stores) => {  
  const params = extractParamsOfRoutes(routes)
  const promises = getRoutes('onEnter', routes)
  return Promise.all(promises.map(onEnter => onEnter({ //here we call the static method of the matched routes
    ...stores,
    params
  })))
}


function extractParamsOfRoutes(routes){
    const arrOfParams = routes.map(route =>{
      return route.params && Object.keys(route.params).length > 0 && route.params
    }).filter(Boolean)

    let newObj = {}

    arrOfParams.forEach(obj =>{
      for (const key in obj) {
        newObj[key] = obj[key]
      }
    })
  return newObj
}