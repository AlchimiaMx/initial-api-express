'use strict';
const language = require('./language');
const rules = require('./rules')

function pre( value, state, options ) {
  return value
}

module.exports = (Joi) => ({
  name: 'string',
  base: Joi.string(),
  language: language,
  pre: pre,
  rules: rules
})
