const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/', async (request, response) => {
  await User.find({}).then(users => {
    response.json(users)
  }).catch(err => {
    console.error(err)
  })
})

userRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params

  await User.findById(id).then(findUser => {
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

userRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const user = request.body

  const SALTROUNDS = 10
  const passwordHash = await bcrypt.hash(user.password, SALTROUNDS)

  const newUserInfo = {
    user: user.user,
    password: passwordHash,
    name: user.name,
    surname: user.surname
  }

  await User.findByIdAndUpdate(id, newUserInfo, { new: true }).then(updateUser => {
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

userRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params

  await User.findByIdAndRemove(id).then(deleteUser => {
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

userRouter.post('/', async (request, response, next) => {
  const user = request.body
  if (!user || !user.user || !user.password || !user.name || !user.surname) {
    return response.status(400).json({
      error: 'no cumple con los datos requeridos'
    })
  }
  const SALTROUNDS = 10
  const passwordHash = await bcrypt.hash(user.password, SALTROUNDS)

  const newUser = new User({
    user: user.user,
    password: passwordHash,
    name: user.name,
    surname: user.surname
  })

  await newUser.save()
    .then(saveUser => {
      response.status(201).json(saveUser)
    }).catch(err => {
      next(err)
    })
})

module.exports = userRouter
