const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.post("/lists/:id/item/create", itemsController.create);
router.get("/lists/:listId/item/:id/edit", itemsController.edit);
router.post("/lists/:listId/item/:id/update", itemsController.update);
router.post("/lists/:listId/item/:id/destroy", itemsController.destroy);

module.exports = router;
