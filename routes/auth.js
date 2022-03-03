const router = require("express").Router();
const authController = require('../controller/authController');

router.post("/register", authController.registerModule);
router.post("/login", authController.loginmodule);


module.exports = router;