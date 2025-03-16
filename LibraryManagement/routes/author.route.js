const authorRoute = require("express").Router();
const authorController = require("../controllers/author.controller");
//const validationMiddleware = require("../middlewares/validation.middleware");
const { AuthorSchema } = require("../utils/authorValidation");

authorRoute.
    route("/").
    get(authorController.getAllAuthor);



authorRoute.
    route("/:id").
    get(authorController.getAuthorById);


module.exports = authorRoute;
