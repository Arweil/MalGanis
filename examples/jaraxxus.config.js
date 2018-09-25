const dev = {
  assetsPublicPath: '/',
  assetsSubDirectory: 'static',
  cssModules: true,
  devtool: 'eval-source-map',
  port: 3000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  autoOpenBrowser: true,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: {},
  contentBase: 'public',
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
  dev,
  build
}
