const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");

router.get("/users/sign_up", userController.signUpPage);
router.post("/users", validation.validateNewUsers, userController.create);
router.get("/users/sign_in", userController.signInPage);
router.post("/users/sign_in", validation.validateUsers, userController.signIn);
router.get("/users/sign_out", userController.signOut);

module.exports = router;
