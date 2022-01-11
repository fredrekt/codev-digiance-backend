require('dotenv').config()
require('./config/database').connect()

const express = require('express');
const app = express()
const cors = require('cors')

const port = 1337

app.use(express.json())
app.use(cors())

const usersRoute = require('./routes/users')
app.use('/users', usersRoute)


app.listen(port, () => console.log(`Runningg on port ${port}`))