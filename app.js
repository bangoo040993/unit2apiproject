const express = require('express')
const morgan = require('morgan')
const usersRoutes = require('./routes/usersRoutes')
const itemsRoutes = require('./routes/itemsRoutes')
const cartRoutes = require('./routes/cartsRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', usersRoutes)
app.use('/items', itemsRoutes)
app.use('/carts', cartRoutes)
module.exports = app

