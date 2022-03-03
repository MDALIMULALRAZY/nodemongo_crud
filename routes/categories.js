const router = require("express").Router();
const categoriesController = require('../controller/categoriesController');

router.post("/", categoriesController.postcategoryModule);
router.get("/", categoriesController.getcategoryModule);


module.exports = router;