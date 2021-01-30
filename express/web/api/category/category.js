var express = require("express");
var router = express.Router();
const { verify } = require("../../middleware");
const categoryController = require("../../controller/category");


router.route('/').get(categoryController.list)
router.route('/:slug').get(categoryController.view)
router.route('/:slug').all(verify).get(categoryController.delete)

module.exports = router