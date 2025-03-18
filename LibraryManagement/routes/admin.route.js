const adminRoute = require("express").Router();
const userController = require("../controllers/user.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const isAuthenicated = require("../middlewares/isAuthenicated.middleware");
const authorController = require("../controllers/author.controller");
const bookController = require("../controllers/book.controller")
const contactController = require("../controllers/contact.controller")
const borrowBooksController = require("../controllers/borrowedBook.controller")


// !USERS
// ? 
adminRoute.route("/users").get(isAuthenicated, isAdmin, userController.getAllUsers);
adminRoute.route("/user/:id").get(isAuthenicated, isAdmin, userController.getUserById);
adminRoute.route("/user/:id").patch(isAuthenicated, isAdmin, userController.updateUserbyId);
adminRoute.route("/user/:id").delete(isAuthenicated, isAdmin, userController.deleteUserbyId);

//! if making request and get failed please make sure sending request to route("users") 
// ! cross check i m making changes at 16march **


// !Authors
//?  i have to  open a getauthorAll for everyone -- ** later on
adminRoute.route("/author").post(isAuthenicated, isAdmin, authorController.addNewAuthor);

// ? need to make this route for everyone one general rouutes while later on
adminRoute.route("/author").get(isAuthenicated, isAdmin, authorController.getAllAuthor);
adminRoute.route("/author/:id").get(isAuthenicated, isAdmin, authorController.getAuthorById);

adminRoute.route("/author/:id").patch(isAuthenicated, isAdmin, authorController.updateAuthorById);
adminRoute.route("/author/:id").delete(isAuthenicated, isAdmin, authorController.deleteAuthorById);

// !Books
adminRoute.route("/book").post(isAuthenicated, isAdmin, bookController.addNewBook);

// ? need to make this route for everyone one general rouutes while later on
adminRoute.route("/books").get(isAuthenicated, isAdmin, bookController.getAllBook);
adminRoute.route("/book/:id").get(isAuthenicated, isAdmin, bookController.getBookById);

adminRoute.route("/book/:id").patch(isAuthenicated, isAdmin, bookController.updateBookById);
adminRoute.route("/book/:id").delete(isAuthenicated, isAdmin, bookController.deleteBookById);


// !contacts
adminRoute.route("/contacts").get(isAuthenicated, isAdmin, contactController.getAllContacts);
adminRoute.route("/contacts/:id").delete(isAuthenicated, isAdmin, contactController.deleteContactById);


// ! borrowing books
adminRoute.route("/borrowings").get(isAuthenicated, isAdmin, borrowBooksController.getBorrowedBooksTransactions,)

//adminRoute.route("/:id/return").put(isAuthenicated, borrowBooksController.returnBorrowedBook,);

adminRoute
    .route("/borrowings/:id/return")
    .put(isAuthenicated, borrowBooksController.returnBorrowedBook);





module.exports = adminRoute;
