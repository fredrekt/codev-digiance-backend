require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const app = express()

const port = 1337

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log("Database connected with atlas"))

app.use(express.json())

const usersRoute = require('./routes/users')
app.use('/users', usersRoute)


app.listen(port, () => console.log(`Runningg on port ${port}`))