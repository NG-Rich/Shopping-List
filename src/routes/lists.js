const express = require("express");
const router = express.Router();
const listsController = require("../controllers/listsController");

router.get("/lists", listsController.index);
router.get("/lists/new", listsController.new);

module.exports = router;
