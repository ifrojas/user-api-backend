const mongoose = require('mongoose')
const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

// ----------------------------Find Data--------------------------
// User.find({}).then(result => {
//   console.log(result)
//   mongoose.connection.close()
// }).catch(err => {
//   console.error(err)
// })

// ----------------------------Create Data--------------------------
// const user = new User({
//   user: 'srojas',
//   password: '1234',
//   name: 'Sergio',
//   surname: 'Rojas'
// })

// user.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   }).catch(err => {
//     console.error(err)
//   })
