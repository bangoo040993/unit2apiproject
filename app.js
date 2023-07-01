const express = require('express')
const morgan = require('morgan')
const usersRoutes = require('./routes/usersRoutes')
const itemsRoutes = require('./routes/itemsRoutes')
const todosroutes = require('./routes/todosRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', usersRoutes)
app.use('/items', itemsRoutes)
app.use('/todos', todosroutes)
module.exports = app

// //{
// "title": "5",
// "completed": true
// }