const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDb Connected : ${con.connection.host}`)
  } catch (error) {
    console.error(`Error : ${error.message}`)
    process.exit(1) //exit(1)=> with failure
  }
}
module.exports = connectDB