module.exports = [
  {
    name: 'objectid',
    validate(params, value, state, options) {
      if (typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value)) {
        return value
      }
      else return this.createError('string.objectid', {v: value}, state, options)
    }
  },
  {
    name: 'emailfull',
    validate(params, value, state, options) {
      if (typeof value === 'string' && /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        return value
      }
      else return this.createError('string.emailfull', {v: value}, state, options)
    }
  }
]
