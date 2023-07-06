const express = require("express");
const router = express.Router();
const itemsControllers = require("../controllers/itemsControllers");
const usersControllers = require("../controllers/usersControllers");

router.get("/", itemsControllers.getAllItems);
router.get("/:id", itemsControllers.getOneItem);
router.post("/create", itemsControllers.createItem);
router.delete("/:id", itemsControllers.deleteItem);
router.put("/:id", itemsControllers.updateItem);
router.put(
    "/:id/favorite",
    usersControllers.auth,
    itemsControllers.favoriteAnItem
);

module.exports = router;
