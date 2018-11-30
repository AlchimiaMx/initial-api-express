const initialConfig = {
  address   : "127.0.0.1",
  port      : 27017,
  database  : process.env.DB_NAME || "initialdb",
  user      : process.env.DB_USER || "developer",
  password  : process.env.DB_PASS || "zxc123"
}

module.exports = {
  options: {
    config: { autoIndex: true },
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  debug: process.env.DB_DEBUG || true,
  // WARNING: change to connect with authentication
  uri: `mongodb://${initialConfig.address}:${initialConfig.port}/${initialConfig.database}`
  //uri: `mongodb://${initialConfig.user}:${initialConfig.password}@${initialConfig.address}:${initialConfig.port}/${initialConfig.database}`
}
