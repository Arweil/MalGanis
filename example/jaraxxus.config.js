const dev = {
  assetsPublicPath: '/',
  assetsSubDirectory: 'static',
  devtool: 'eval-source-map',
  port: 3000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: {},
  useEslint: false,
  showEslintErrorsInOverlay: true,
  before: function(app) {
  },
  after: function(app) {
  }
}

const build = {
}

module.exports = {
  entry: 'src/index.js',
  srcPath: 'src',
  appHtml: 'public/index.html',
  cssModules: false,
  dev,
  build
}
