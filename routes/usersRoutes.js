const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');


router.get('/', usersControllers.getAllUsers)
router.get('/:id', usersControllers.getOneUser)
router.post('/', usersControllers.createUser);
router.post('/login', usersControllers.loginUser)
// router.post('/logout', usersControllers.auth, usersControllers.logoutUser)
router.delete('/:id', usersControllers.auth, usersControllers.deleteUser)
router.put('/:id', usersControllers.auth, usersControllers.updateUser)


module.exports = router;