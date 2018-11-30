module.exports = (router, permissions, Validate, Example, upload, config) => {
  // Endpoints
  require('./create')(router, permissions, Validate, Example)
}
