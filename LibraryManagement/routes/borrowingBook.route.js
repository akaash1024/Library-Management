

const borrowingsBooksRoute = require("express").Router();

const borrowings_Books_Controller = require("../controllers/borrowedBook.controller")

const isAuthenicated = require("../middlewares/isAuthenicated.middleware");
const isMember = require("../middlewares/isMember.middleware");


// ! need to implement a middleware which is accessable to members only

borrowingsBooksRoute
  .route("/")
  .post(isAuthenicated, isMember, borrowings_Books_Controller.borrowABook);


// ! need to test later as creating on visual while production
// ! still not sure from where getting data
// ! cause of time being i amm leaving here, but need ALERT to solve // TODO
borrowingsBooksRoute
  .route("/my")
  .get(isAuthenicated, isMember, borrowings_Books_Controller.getUserBorrowingLogs);


borrowingsBooksRoute
  .route("/:id/return")
  .put(isAuthenicated, borrowings_Books_Controller.returnBorrowedBook);

module.exports = borrowingsBooksRoute;
