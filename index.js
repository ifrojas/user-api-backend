// Use Http
// const http = require('http') tambien se puede usar ES import http from 'http'

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(users))
// })

// Use Express
const express = require('express')
const cors = require('cors')
const app = express()

const exampleMiddleware = require('./exampleMiddleware')
app.use(exampleMiddleware)

app.use(cors)

app.use(express.json())

let users = [
  {
    id: 1,
    user: 'ifrojas',
    password: '1234',
    name: 'Ivan',
    surname: 'Rojas'
  },
  {
    id: 2,
    user: 'maedi',
    password: '1234',
    name: 'Maria',
    surname: 'Caicedo'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>HI!!!</h1>')
})

app.get('/api/users', (request, response) => {
  response.json(users)
})

app.get('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users.find(user => user.id === id)
  if (user) {
    response.json(user)
  } else {
    response.status(404).json({
      error: 'Elemento no encontrado'
    })
  }
})

app.delete('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  users = users.filter(user => user.id !== id)
  response.status(204).end()
})

app.post('/api/users', (request, response) => {
  const user = request.body
  if (!user || !user.user || !user.password || !user.name || !user.surname) {
    return response.status(400).json({
      error: 'no cumple con los datos requeridos'
    })
  }

  const ids = users.map(user => user.id)
  const maxId = Math.max(...ids)
  const newUser = {
    id: maxId + 1,
    user: user.user,
    password: user.password,
    name: user.name,
    surname: user.surname
  }

  users = [...users, newUser]
  response.status(201).json(newUser)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Ruta no valida'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`API SERVER PORT ${PORT}`)
})
