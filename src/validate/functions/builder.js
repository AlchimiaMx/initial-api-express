module.exports = (validations, params, Joi) => {
  if (params.forbidden && params.forbidden.length > 0) {
    params.forbidden.forEach(e => validations[e] = validations[e].concat(Joi.forbidden()))
  }
  if (params.required && params.required.length > 0) {
    params.required.forEach(e => validations[e] = validations[e].concat(Joi.required()))
  }
  if (params.excluded && params.excluded.length > 0) {
    params.excluded.forEach(e => delete validations[e])
  }
  if (params.include && params.include.length > 0) {
    let validationsAux = {}
    params.include.forEach(e => validationsAux[e] = validations[e])
    validations = validationsAux
  }
  return Joi.object().keys(validations).required()
}
