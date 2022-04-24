// Use Http
// const http = require('http') tambien se puede usar ES import http from 'http'

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(users))
// })

// Use Express
require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const app = express()
const userRouter = require('./controllers/user')

const exampleMiddleware = require('./exampleMiddleware')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
app.use(exampleMiddleware)

// importar recursos estaticos (imagenes)
app.use('/images', express.static('images'))

// solucionar problemas de CORS
app.use(cors())

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>HI IFROJAS DEV!!!</h1>')
})

app.use('/api/users', userRouter)

// Middleware control error
app.use(handleErrors)

app.use(notFound)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`API SERVER PORT ${PORT}`)
})
