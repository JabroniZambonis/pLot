const express = require('express')
const app = express()
const userRouter = require('/routes/userRouter')

app.get('/users', userRouter) //Mounts route for 'users'

app.listen(process.env.PORT) //Pulled from .env file
