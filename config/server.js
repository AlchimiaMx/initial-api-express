const pathToRegexp = require('path-to-regexp');

module.exports = {
  dump: process.env.DUMP || false,
  port: process.env.PORT || 8080,
  uploadPath: './upload',
  publicUpload: 'http://alchimia.mx/', // Debe terminar con '/'
  filetypes: /jpeg|jpg|png/,
  auth: {
    secret: "testSecretKey",
    credentialsRequired: true,
    level: ['ROOT', 'ADMIN', 'USER'],
    unless:{
      path: [
        "/api/login",
        pathToRegexp('/api/users/validate/:uuid')
      ]
    },
    permissions: {
      ROOT: [
        'ROOT',
        'ALL'
      ],
      ADMIN: [
        'ADMIN',
        'ALL'
      ],
      USER: [
        'ALL',
        'USER'
      ]
    }
  }
}
