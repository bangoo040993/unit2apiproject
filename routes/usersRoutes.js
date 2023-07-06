const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");

router.get("/", usersControllers.getAllUsers); //working
router.get("/:id", usersControllers.getOneUser); //working
router.post("/", usersControllers.createUser); //working
router.post("/login", usersControllers.loginUser); //working
router.post("/logout", usersControllers.auth, usersControllers.logoutUser);
router.delete("/:id", usersControllers.auth, usersControllers.deleteUser); //working
router.put("/:id", usersControllers.auth, usersControllers.updateUser); //working

module.exports = router;
