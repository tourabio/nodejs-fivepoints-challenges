const mongoose = require('mongoose')
const con = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => {
    console.log(
      '=> Successfully MongoDb Connected : ',
      success.connections[0].host
    )
  })
  .catch((error) => {
    console.log(error)
  })

module.exports = con
