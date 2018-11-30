'use strict'
const request = require('supertest')
const expect = require('chai').expect
const should = require('chai').should()
const config = require('../config')
const mongoose = require('mongoose')

const uri = `http://localhost:${config.server.port}/api`
const api = request(uri)
mongoose.Promise = Promise
mongoose.connect(config.db.uri, config.db.options)

// Models
const models = {
  //Users: require('../src/api/users/model') (mongoose, config.server.auth),
}

require('./example')(api, expect)
