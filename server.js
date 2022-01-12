require('dotenv').config()
require('./config/database').connect()

const express = require('express');
const app = express()
const cors = require('cors')

const port = process.env.PORT || 1337

app.use(express.json())
app.use(cors())

// users
const usersRoute = require('./routes/users')
app.use('/users', usersRoute)

// stripe
const stripeRoute = require('./routes/stripe')
app.use('/stripe', stripeRoute)



app.listen(port, () => console.log(`Runningg on port ${port}`))