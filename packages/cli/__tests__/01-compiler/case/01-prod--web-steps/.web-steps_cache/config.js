const clientConfig = require('../config/webpack-client')
const serverConfig = require('../config/webpack-server')
module.exports = function() {
  return {
    test: '01-prod--web-steps',
    src: {
      SSRWebpack: {
        client: clientConfig,
        server: serverConfig
      }
    }
  }
}
