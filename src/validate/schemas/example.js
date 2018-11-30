module.exports = (Joi, config) => {
  return {
    activation: Joi.array().items(Joi.string().objectid()).label('tiendas'),
    start: Joi.date().label('fecha de inicio'),
    end: Joi.date().label('fecha final'),
    promoter: Joi.array().items(Joi.string().objectid()).label('promotores'),
    byActivation: Joi.boolean()
  }
}
