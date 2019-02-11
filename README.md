# Inferno MobX Starter with Dynamic Import and SSR

A modern web development boilerplate for Inferno + MobX + Webpack.


### Stack:
+ Inferno 6
+ MobX 5 (interchangeable with MobX 4 for ES5 compatibility: https://github.com/mobxjs/mobx/blob/e17c47833d1812eee6d77914be890aa41e4b7908/CHANGELOG.md#500 )
+ Koa 2
+ Webpack 4
+ Babel 7
W
### Features:
+ Isomorphic / SSR for SEO goodness
+ Code Splitting via Dynamic Imports
+ Hot reload (only client atm)
+ CSS and SCSS compilation
+ Decorators for accessing actions and state
+ `async/await` support
+ Bundle size as small as possible with Brotli (.br)
+ PWA ready (manifest, precaching)
+ working vscode launch config for better dev experience


## How to run

**For development:**

    `npm run dev`

**For production:**

    1. `npm run build:prod:bundles` (will build the client and server bundles)
    2. `npm run run:prod:server` (start the koa server)

## Requirements

    Node 9+ (could also work with node8 but I have not tested it yet)

## Goals

- Optimized for minimal bundle sizes via code splitting.
- Optimized for server-side speed.
- Using Inferno, the fastest React-like framework out there. 
- Using MobX, the easiest and insanely fast state manager.
- Simple and minimal with routing and server-side rendering.
- Good developer experience with hot-reloading and source-maps.
- Get to 100% score on Google Lighthouse

## Structure

Here are the vital folders/files to care about

```js
inferno-starter/
└───src/
    │
    └───components/
    |     |
    |     └───layout/
    |       layout.js // Container component for the app, is imported at src/config/routes.js
    |
    └───stores/ // new store has to be added to src/config/context.js to make it accessible via @inject/@observe
    |     state.js
    |     data.js
    |     ui.js
    |     ...
    |
    └───config/
    |     context.js //returns combined state/store obj 
  	|     routes.js // routes are declared here
    |     autorun.js // handles sideeffects of state manipulations
```

* `src/pages/index.html` - can be dynamically extended via `src/server/middleware/render.js`
* `src/config/client.js` - Webpack Entry point for browser bundle
* `src/config/serverAppEntry.js` - Webpack Entry point for node (server-side rendering) bundle
* `core/webpack/` - all webpack configs, flow: base-> env base (dev, prod etc.) -> client + server configs

Typically, when adding a new page you'd add a route for it in `src/config/routes.js` containing the component to render. *Note that the component isn't imported directly but with import() for code splitting.* Then you can add the component to the components folder and the relevant state to the store.

This project is a boilerplate and does not impose strong architectural decisions on users. 

# F.A.Q.

## What are `stores` ?

State contains the state of your application (ex: list of your todos, UI state etc).
Stores contain the methods that mutate that state (ex: adding a todo, fetching data).
Technically our State object is also a store, but we make the differentiation so that our logic is easier to follow by using the same principes as redux (one big state object).
See https://mobx.js.org/best/store.html for more infos

## How to access our `state` and `stores` in our components ?

```js
...
import { inject, observer } from 'inferno-mobx'

@inject('state', 'store') @observer
class MyComponent extends Component {
  componentDidMount() {
    const { state, store } = this.props
    store.common.doSomething();
  }

  render({ state, store }) {
     return <div>{state.common.username}</div>
  }
}
```

## What is `inject` and `@observer` ?

The `@inject` decorator injects stores into your components. Now you have access to all the methods to manipulate and read the `state`
The `@observer` decorator keeps your components up to date with any changes in your stores. 

*Note: `@observer` should be the innermost decorator when used with other decorators or higher-order-components* (https://mobx.js.org/refguide/observer-component.html)

_Example: If you display a `messageCount` from a `Messages` store and it gets updated, 
then all the visible components that display that `messageCount` will update themselves._


## Does connecting many components make my app slower?

**No**, it actually allows the rendering to be done more efficiently. So connect as many as you want ! (https://mobx.js.org/best/react-performance.html#use-many-small-components)

## Adding stores

1. Goto `src/stores`
2. Add `[Name].js` (it's just a class, ex: `Common.js`)
3. Update `src/config/context.js`

## Disabling server-side rendering

1. Goto `server/config.js`
2. Change `SSR: true` to `SSR: false`

*Note: When disabling SSR you have to move the async calls from `onEnter` into the livecycle for the client side to work (`componentDidMount`). Because the way `onEnter` works it asumes that onEnter was already called on the server side and therefore will not call it again on the client. But honestly if you dont want to use SSR, this boilerplate is an overkill anyway.*

## My components are not updating!

Make sure you added the `@inject` and `@observer` decorator to your component.

## My stateless component doesn't have access to the stores !

You cannot use decorators on stateless components.
You should instead wrap your component like this:

```js
import { inject, observer } from 'inferno-mobx'

// Simple observable component
const MyComponent = inject('state', 'store')(observer(props => {
  return <p>Something is {props.state.mood}</p>
}))

```

## How do I execute async actions on the server and/or client ?

Add a static `onEnter` method to your component like this:

```js
import { inject, observer } from 'inferno-mobx'

@inject( 'state', 'store' ) @observer
export default class MyComponent extends Component {
  static async onEnter(props) {
      const {store, state, params} = props
      await store.data.loadSomeTypeOfData()
  }
  // ...
}
```
It passes all your stores and url params as arguments as a convenience.

**Caveats:**

The `onEnter` method has to be placed in the route-component which will be called in the routes config (`routes.js`).
You therefore have to move the logic to load dependent data or do other stuff to the component which will be called via the router.

_Example: Loading dependent data of async call_

```js
@inject( 'state', 'store' ) @observer

//class with static onEnter method
class MyPage extends Component {
  static async onEnter(props) {
        const {store, state, params} = props
        await store.data.getDataBySlug(`${params.slug}`) // will load data into state.data OBJ

        //only load dependent data if state was updated with the right data we called above
        if(state.data.slug === params.slug) await store.data.loadChildData

        //only update ui if onEnter has been called on the server
        if(typeof window === 'undefined') store.ui.doServerUIStuff()
    }
  // ...
}

//route which imports the "MyPage" component
{
  path: parentRoute => `${parentRoute}/mypage`,
  component: generateAsyncRouteComponent({
    loader: () => import( /* webpackChunkName: "my-page" */ '../pages/MyPage'),
  }),
}
```

**You still can use inferno's own lifecycle methods like `componentDidMount` (but will only on client-side)**


## How am I able to modify the returned html outside of the app container?

Because this is an isomorphic app you need to account for server-side-rendering and client-side-rendering:

### SSR

the entry point for extending the html document is `index.html`. Here you can add static stuff like tags in the <head> or add placeholders for dynamic stuff. Our koa server middleware (`src/server/middleware/render.js`) always reads the `index.html` and overrides the given placeholders.


### CSR

**via mobx**

With mobX there is a convenient method to manipulate the DOM in general - the `autorun` function. Autorun listens to the state and automatically dispatches sideeffects. In `src/config/autorun.js` you can add more sideeffect. Here the autorun also passes the state, store and history to have full control over the app.

*Example: * 

```js
export default function ({state, store}, history) {
    autorun(() => {
        //react to title changes
        if (state.seoTitle) {
            document.title = state.seoTitle

            const el = document.querySelector('meta[property="og:title"]')
            if(el){
                el['content'] = state.seoTitle
            }
            const el1 = document.querySelector('meta[name="title"]')
            if(el1){
                el1['content'] = state.seoTitle
            }
        }
    })
}
```

**via inferno createPortal**

with `inferno.createPortal()` we are able to manipulate DOM that is not directly in our app.
see: https://github.com/infernojs/inferno#createportal-package-inferno


## Routes

Routes are defined at `src/config/routes.js`.

Each route can handle the same properties as the react-router v4+ / inferno-router v4+

*Example Route Obj*
```js
{
  path: parentRoute => `${parentRoute}/about`,
  exact: true,
  strict: true,
  component: generateAsyncRouteComponent({
    loader: () => import( /* webpackChunkName: "about" */ '../pages/About'),
  }),
}
```

* `path` - the route path to match, can handle regex and url params (https://reacttraining.com/react-router/web/api/Route/path-string-string)
* `exact, strict` - (https://reacttraining.com/react-router/web/api/Route/exact-bool)
* `component` - here we pass `generateAsyncRouteComponent` to dynamically import our component

You can name the exported components via a magic comment (https://webpack.js.org/api/module-methods/#magic-comments). When running `npm run build:prod:bundles` you will be able to see the exported bundles with the stated name.


### Why do we need a centralized routes config?

Inferno Version >= 4 does not have a centralized routes config. Because we want to load stuff async on server side and client side we need to know about the possible routes we are going to hit. 

With the centralized route config we are able to fetch the needed bundles and read the static `onEnter` method of those. 

**this functionality is highly inspired by:**

* https://github.com/nightwolfz/inferno-starter
* https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70
* https://github.com/gdborton/rrv4-ssr-and-code-splitting



## TODO

- [ ] Hot Reloading server
- [ ] use createPortal for manipulating stuff in the `<head>` (https://github.com/infernojs/inferno#createportal-package-inferno)
- [ ] use css modules
- [ ] SAAS - alternatively deploy koa server to google functions (firebase) or similar 

## Author

Kai Dellmann