const express = require('express')
const router = express.Router()
const cartsController = require('../controllers/cartsControllers')
const usersController = require('../controllers/usersControllers')

router.post('/create', usersController.auth, cartsController.createCart)//working
router.get('/:id', usersController.auth, cartsController.getOneCart)//working
router.get('/', cartsController.getAllCarts)//working
router.put('/:id/edit', usersController.auth, cartsController.addItemToCart)//working

module.exports = router 