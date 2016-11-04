const express = require('express')
const app = express()
const userRouter = require('/routes/userRouter')
const locationRouter = require('./routes/locationRouter')

app.get('/users', userRouter) //Mounts route for 'users'
app.use('/locations', locationRouter)

app.listen(process.env.PORT) //Pulled from .env file
