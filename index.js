'use strict'
// dependencies
const express = require('express')
const http = require('http')
const terminus = require('@godaddy/terminus')
const config = require('./config')
const mongoose = require('mongoose')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwtMiddleware = require('express-jwt')
const boom = require('express-boom')
const multer = require('multer')
const fs = require('fs')
const { WebClient } = require('@slack/client')
const router = express.Router()
const app = express()
// /dependencies

// Database config
mongoose.Promise = Promise
mongoose.set('debug', config.db.debug);

// Logging
morgan.token('user_name', (req, res) => {
  return (req.user && req.user.email)? `<${req.user.email}>`: ''
})

// Slack Notification
const slack = new WebClient(config.slack.token)
function slackSend( title, text, color = 'good') {
  if (config.slack.active) {
    return slack.chat.postMessage( {
      channel: config.slack.conversationId,
      attachments: [ {
        color,
        text,
        title,
        footer: 'Petri-Express @Alchimia',
        ts: parseInt(Date.now() / 1000),
      } ]
    })
  }
  else Promise.resolve()
}
function errorReq( req, err ) {
  if (config.slack.active) {
    return slack.chat.postMessage( {
      channel: config.slack.conversationId,
      attachments: config.slack.formatRouter( req, err )
    })
  }
  else Promise.resolve()
}

// Server config
app.locals.errorReq = errorReq
app.locals.slackSend = slackSend
app.locals.slack = slack
app.set('port', config.server.port)
app.use(helmet())
app.use( compression( { level: 9 } ) )
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: '100mb'}))
app.use(morgan('> :date[iso] :user_name --> [:method] :url [:status] ( :response-time ms ) '))
app.use(boom())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

//Graceful Shutdown
function healthCheck () {
  return mongoose.connection.db.admin().ping()
}

function onSignal (){
  console.log('\n--> [SERVER] server is starting cleanup!')
  slackSend('SERVER', 'server is starting cleanup!', 'warning')
  return mongoose.connection.close()
}

function onShutdown () {
  console.log('--> [SERVER] cleanup finished, server is shutting down');
}

const optionsTerminus = {
  timeout: 2000,
  signals: ['SIGINT', 'SIGTERM'],
  onSignal,
  healthChecks: {
    '/healthcheck': healthCheck
  },
  onShutdown,
  logger: console.log
}
// / Server config

// Authenticate config
const validate = (req, payload, done) => {
  if (!payload.exp) return done(null, true)
  else {
    mongoose.model('users').findById(payload._id, '-__v -password -updatedAt', (err, resUser) => {
      if (err) return done(err)
      if (!resUser || resUser.archived) return done(null, true)
      if (payload.level != resUser.level) return done(null, true)
      if ((config.server.auth.permissions[resUser.level]).some( (item, i) => { item == payload.permissions[i] })) return done(null, true)
      return done(null, false)
    })
  }
}
const authenticate = jwtMiddleware({
  secret: config.server.auth.secret,
  credentialsRequired: config.server.auth.credentialsRequired,
  getToken: (req)=> {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
  isRevoked: validate
}).unless (config.server.auth.unless)

// Middleware error authenticate
const errorAuthenticate = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.boom.unauthorized('Invalid authorization token')
  next()
}

// Error handler
const handlingValidationErrors = ( err, req, res, next ) => {
  if (res.headersSent) return next(err)
  else if (err === 204) return res.status(204).send()
  else if (typeof err === 'string') return res.boom.badRequest(err)
  else if (err.code === 'permission_denied') {
    return res.boom.unauthorized('No tienes los permisos necesarios para esta consulta')
  }
  else if (err.name && err.name === 'ValidationError' && err.details && err.details[0].message) {
    errorReq(req, err)
    console.log(err.annotate())
    return res.boom.badRequest(err.details[0].message)
  }
  else {
    errorReq(req, err)
    console.log(err)
    return res.boom.badRequest('La validación de tus datos ha fallado, comunícate con soporte lo antes posible.')
  }
}

// Update File
if (!fs.existsSync(`${config.server.uploadPath}`)) fs.mkdirSync(`${config.server.uploadPath}`)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Configuración de locación de los documentos que se suban por la API
    cb(null, config.server.uploadPath)
  },
  filename: (req, file, cb) => {
    // Rename file
    cb(null, `${file.originalname}`)
  }
})
const upload = multer({
  storage: storage
})

// Router
require('./src/api')(router, mongoose, config, upload )
app.use( '/api', authenticate, errorAuthenticate, router, handlingValidationErrors)

mongoose.connect(config.db.uri, config.db.options).then(
  ()=> {
    terminus( http.createServer(app) , optionsTerminus )
    .listen (app.get('port'), (err) => {
      console.log (`Server running on port ${app.get("port")}`)
    })
  },
  err => {
    console.log(`--> ERROR in database connect`)
    console.log(err);
  }
)

// Event Database
mongoose.connection.on ('connected',() => {
  console.log(`--> [MONGOOSE] Database connected: ${config.db.dbUri}`)
})
mongoose.connection.on ('disconnected', () => {
  console.log(`--> [MONGOOSE] Database disconnected`)
})
mongoose.connection.on ('error', () => {
  console.log(`--> [MONGOOSE] ERROR in database connect`)
})
// /Event Database
