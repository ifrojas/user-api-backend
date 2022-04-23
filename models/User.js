const { model, Schema } = require('mongoose')
const userSchema = new Schema({
  user: String,
  password: String,
  name: String,
  surname: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = model('User', userSchema)

module.exports = User
