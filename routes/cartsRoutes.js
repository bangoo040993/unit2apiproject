const express = require('express')
const router = express.Router()
const cartsController = require('../controllers/cartsControllers')
const usersController = require('../controllers/usersControllers')

router.post('/create', cartsController.createCart)
router.get('/:id', cartsController.getOneCart)
router.get('/', cartsController.getAllCarts)


module.exports = router 