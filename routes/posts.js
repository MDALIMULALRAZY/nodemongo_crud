const router = require("express").Router();
const postsController = require('../controller/postsController');

router.post("/", postsController.createpost);
router.put("/:id", postsController.updatepost);
router.delete("/:id", postsController.deltepost);
router.get("/:id", postsController.getpost);
router.get("/", postsController.getallpost);

module.exports = router;