// load environment variables
require('dotenv').config({silent: true})

const express = require('express')
const app = express()
// const userRouter = require('/routes/userRouter')
const locationRouter = require('./routes/locationRouter')

app.get('/test', function (req, res) {
  res.send('Hey there')
})

// app.get('/users', userRouter) //Mounts route for 'users'
app.use('/locations', locationRouter)

app.listen(process.env.PORT, () => 
  console.log(`Running at http://localhost:${process.env.PORT}`)
) //Pulled from .env file
