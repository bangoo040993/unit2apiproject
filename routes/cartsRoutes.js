const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartsControllers");
const usersController = require("../controllers/usersControllers");

router.post("/:id/create", usersController.auth, cartsController.createCart); //working
router.get("/:id", usersController.auth, cartsController.getOneCart); //working
router.get("/", cartsController.getAllCarts); //working
router.put("/:id/edit", usersController.auth, cartsController.addItemToCart); //working
router.put("/:id/remove", usersController.auth, cartsController.removeItemFromCart); //working
router.delete("/:id/delete", usersController.auth, cartsController.deleteCart);

module.exports = router;
