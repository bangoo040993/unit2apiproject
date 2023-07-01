const express = require('express');
const router = express.Router();
const itemsControllers = require('../controllers/itemsControllers');


router.get('/', itemsControllers.getAllItems)
router.get('/:id', itemsControllers.getOneItem)
router.post('/create', itemsControllers.createItem);
// router.delete('/:id', itemsControllers.deletecreateItem)
// router.put('/:id', itemsControllers.updatecreateItem)


module.exports = router;