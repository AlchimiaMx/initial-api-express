const config = require('../../config')
const builder = require('./functions/builder')
const BaseJoi = require('joi');
const custom = require('./custom')
const Joi = BaseJoi.extend(custom)

module.exports = (name, getData, params = {}, getParamsFunction = false) => {
  return (req, res, next) => {
    const getParams = (!getParamsFunction)? params: getParamsFunction(req, config)
    let requestData = getData.reduce( (before, field) => {
      return Object.assign(before, req[field])
    }, {})
    const schema = builder(require(`./schemas/${name}`)(Joi, config), getParams, Joi)
    Joi.validate(requestData, schema, config.joi)
    .then( payload => {
      req.schema = payload
      return next()
    }).catch(next)
  }
}
