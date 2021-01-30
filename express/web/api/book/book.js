var express = require("express");
var router = express.Router();
const { verify } = require("../../middleware");
const bookController = require("../../controller/book");
// middleware that is specific to this router

// define the home page route
router.route("/book").post(bookController.add);
router.route("/book").get(bookController.list);
router.route("/book/search").get(bookController.search);
router
  .route("/book/:book_id")
  .all(verify)
  .get(bookController.viewById)
  .put(bookController.update)
  .delete(bookController.delete);
router.route("/book/slug/:slug").all(verify).get(bookController.viewBySlug);
module.exports = router;
