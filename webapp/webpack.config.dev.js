const clientConfig = require('./config/webpack.config.dev.client');
const serverConfig = require('./config/webpack.config.dev.server');

module.exports = [clientConfig, serverConfig];
