const router = require("express").Router();
const userController = require('../controller/userController');

router.put("/:id", userController.updatepost);
router.delete("/:id", userController.deletepost);
router.get("/:id", userController.getuser);


module.exports = router;