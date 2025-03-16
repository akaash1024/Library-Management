

const bookRoute = require("express").Router();
const bookController = require("../controllers/book.controller");

bookRoute.route("/").get(bookController.getAllBook);
bookRoute.route("/:id").get(bookController.getBookById);


module.exports = bookRoute;
