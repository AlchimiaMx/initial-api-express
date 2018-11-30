function handler (Example) {
  return (req, res, next) => {
  }
}

module.exports = (router, permissions, Validate, Example) => {
  router.post(
    '/example',
    permissions.check([['ROOT'], ['ADMIN']]),
    Validate( 'example', ['body'], { required: ['email'] } ),
    handler(Example)
  )
}
