module.exports = function (api) {

  //handle caching to bust on different node envs
  api.cache.using(() => process.env.NODE_ENV)

  const isProd = api.env('production')
  const isStaging = api.env('staging')

  const presets = [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "useBuiltIns": "usage", // polyfills are matched by target environment
        "exclude": ['transform-regenerator', 'transform-async-to-generator'] //because we are using fast-async we exclude the transforms from the preset, else we would need regenerator Runtime and other bloat
      }
    ]
  ]
  let plugins = [
    ["babel-plugin-inferno", {
      "imports": true
    }],
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-syntax-jsx",
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
    ["@babel/plugin-proposal-class-properties", {
      "loose": true
    }],
  ]

  if(!isProd && !isStaging ) plugins.push( //will bug the dynamic imports in client bundle. In DEV we load the Server directly and not via a bundle we have to have dynamic import node here
    'dynamic-import-node'
  )
  
  if (isProd || isStaging) plugins.push(
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-block-scoped-functions",
    "@babel/plugin-transform-block-scoping",
    "@babel/plugin-transform-classes",
    "@babel/plugin-transform-computed-properties",
    "@babel/plugin-transform-destructuring",
    "@babel/plugin-transform-literals",
    "@babel/plugin-transform-parameters",
    "@babel/plugin-transform-shorthand-properties",
    "@babel/plugin-transform-spread",
    "@babel/plugin-transform-template-literals",
    "@babel/plugin-proposal-object-rest-spread",
    ["module:fast-async"]
  )

  return {
    presets,
    plugins
  }
}