module.exports = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    response.status(400).json({
      error: 'elemento con formato no valido'
    })
  } else if (error.errors.user.message) {
    response.status(400).json({
      error: error.errors.user.message
    })
  } else {
    response.status(400).json({
      error: 'Error de datos'
    })
  }
}
