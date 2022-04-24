module.exports = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    response.status(400).json({
      error: 'elemento con formato no valido'
    })
  } else {
    response.status(400).json({
      error: 'Error de datos'
    })
  }
}
