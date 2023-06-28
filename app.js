const express = require('express')
const morgan = require('morgan')
const usersRoutes = require('./routes/usersRoutes')
// const todoRoutes = require('./routes/todos')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', usersRoutes)
// app.use('/todos', todoRoutes)

module.exports = app