
module.exports = {
  // apiPrefix: '/api/v1',
  apiPrefix: process.env.NODE_ENV === 'development' ? '/api' : '',
  // apiPrefix: 'http://fmc.sqaproxy.dasouche-inc.net',
}
