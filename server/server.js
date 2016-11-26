// load environment variables
require('dotenv').config({silent: true})

const express = require('express')
const app = express()
const userRouter = require('./routes/userRouter')
const locationRouter = require('./routes/locationRouter')
const authRouter = require('./routes/authRouter')
const bodyParser = require('body-parser')
const imageParser = require('./lib/imageParser')

//app level middleware

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(imageParser)

app.get('/test', function (req, res) {
  res.send('Hey there')
})

app.use('/users', userRouter) //Mounts route for 'users'
app.use('/locations', locationRouter)
app.use('/auth', authRouter)

app.listen(process.env.PORT, () =>
  console.log(`Running at http://localhost:${process.env.PORT}`)
) //Pulled from .env file
