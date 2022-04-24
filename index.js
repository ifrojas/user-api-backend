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
const User = require('./models/User')

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

app.get('/api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
  }).catch(err => {
    console.error(err)
  })
})

app.get('/api/users/:id', (request, response, next) => {
  const { id } = request.params

  User.findById(id).then(findUser => {
    if (findUser) {
      response.json(findUser)
    } else {
      response.status(404).json({
        error: 'Elemento no encontrado'
      })
    }
  }).catch(err => {
    next(err)
  })
})

app.put('/api/users/:id', (request, response, next) => {
  const { id } = request.params
  const user = request.body

  const newUserInfo = {
    user: user.user,
    password: user.password,
    name: user.name,
    surname: user.surname
  }

  User.findByIdAndUpdate(id, newUserInfo, { new: true }).then(updateUser => {
    if (updateUser) {
      response.status(202).json(updateUser)
    } else {
      response.status(404).json({
        error: 'Usuario no encontrado'
      })
    }
  }).catch(err => {
    next(err)
  })
})

app.delete('/api/users/:id', (request, response, next) => {
  const { id } = request.params

  User.findByIdAndRemove(id).then(deleteUser => {
    if (deleteUser) {
      response.status(202).json({
        action: 'Elemento eliminado'
      })
    } else {
      response.status(404).json({
        error: 'Usuario no encontrado'
      })
    }
  }).catch(err => {
    next(err)
  })
})

app.post('/api/users', (request, response) => {
  const user = request.body
  if (!user || !user.user || !user.password || !user.name || !user.surname) {
    return response.status(400).json({
      error: 'no cumple con los datos requeridos'
    })
  }

  const newUser = new User({
    user: user.user,
    password: user.password,
    name: user.name,
    surname: user.surname
  })

  newUser.save()
    .then(saveUser => {
      response.status(201).json(saveUser)
    }).catch(err => {
      console.error(err)
    })
})

// Middleware control error
app.use(handleErrors)

app.use(notFound)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`API SERVER PORT ${PORT}`)
})
