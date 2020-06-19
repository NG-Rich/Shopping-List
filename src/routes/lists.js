const express = require("express");
const router = express.Router();
const listsController = require("../controllers/listsController");
const validation = require("./validation");
const helper = require("../auth/helpers");

router.get("/lists", listsController.index);
router.get("/lists/new", listsController.new);
router.post("/lists/create",
  validation.validateList,
  listsController.create);
router.get("/lists/:id", listsController.show);
router.get("/lists/:id/edit", listsController.edit);
router.post("/lists/:id/update", listsController.update);
router.post("/lists/:id/destroy", listsController.destroy);

module.exports = router;
