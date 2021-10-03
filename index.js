const express = require('express')
const dotenv = require('dotenv')
var cors = require('cors')
const connectDB = require('./database/db')
const todoApi = require('./routes/todoApi')
const userApi = require('./routes/userApi')
const mailApi = require('./routes/mailApi')
const fileUploadApi = require('./routes/fileUploadApi')
const authApi = require('./routes/authApi')
const bodyParser = require('body-parser')

// run the cron
//const userCron = require('./common/crons/users-cron')
// passport strategy
const passport = require('./passport/passport')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('api is running')
})

app.use('/api', todoApi)
app.use('/api', userApi)
app.use('/api', mailApi)
app.use('/api', fileUploadApi)
app.use('/api', authApi)

//error handler
app.use((err, req, res, next) => {
  res.json({ error: err.message })
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
