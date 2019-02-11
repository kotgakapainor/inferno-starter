/**
 * This is our overly complicated isomorphic "request"
 * @param api {boolean} externer oder interner fetch
 * @returns {Function}
 */
export default {
  async get(url, type, params){
    return await buildRequest('server', 'GET', url, type, params)
  },
  async post(url, data){
    return await buildRequest('server', 'POST', url, 'json', data)
  }
}

/* 
* HTTP Request
*/
async function buildRequest(method, url, type, params) {
  const requestURL = createURL(url) + (method === 'GET' && params ? toQueryString(params) : '')


  const request = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: {}
  }
  const contentType = {
    "json": 'application/json',
    "svg" : 'image/svg+xml',
    "html" : 'text/html'
  }[type]

  request.headers['Content-Type'] = contentType


  if (method === 'POST') {
    request.body = JSON.stringify(params || {})
  }
  return handleResponse( await fetch(requestURL, request) )
}

/**
 * Prepend host of API server
 * @param path
 * @returns {String}
 * @private
 */


function createURL(url) {
  url = url.trimLeft('/')
  return `${url}`
}

/**
 * Decide what to do with the response
 * @param response
 * @returns {Promise}
 * @private
 */
async function handleResponse(response) {
  const redirect = response.headers.get('Location')
  let res
  if (process.env.BROWSER && redirect) {
    window.location.replace(redirect)
    return Promise.reject()
  }
  if (response.headers.get('content-type').includes('json')) {

    //stream json
    
    res = await response.json()

  } else {//if this is not a JSON request we dont manipulate the response any further regarding the encoding

    res = response.text()
    
  }

  if(response.ok){
    if (response.status === 403) {
      console.warn('Unauthorized', response)
    }
    return res
  }else{
    if (res.data && res.data.status === 403) {
      console.log('Error Code 101')
      return null
    } else {
      throw res
    }
  }
}

/**
 * Transform an JSON object to a query string
 * @param params
 * @returns {string}
 */
function toQueryString(params) {
  return '?' + Object.keys(params).map(k => {
    const name = encodeURIComponent(k)
    if (Array.isArray(params[k])) {
      return params[k].map(val => `${name}[]=${encodeURIComponent(val)}`).join('&')
    }
    return `${name}=${encodeURIComponent(params[k])}`
  }).join('&')
}