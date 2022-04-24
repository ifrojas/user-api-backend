const uniqueValidator = require('mongoose-unique-validator')
const { model, Schema } = require('mongoose')
const userSchema = new Schema({
  user: {
    type: String,
    unique: true
  },
  password: String,
  name: String,
  surname: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User
