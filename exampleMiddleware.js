const example = (request, response, next) => {
  console.log('Execute Middleawre')
  next()
}

module.exports = example
