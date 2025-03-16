const authRoute = require("express").Router();
const authController = require("../controllers/auth.controller");

const isAuthenicated = require("../middlewares/isAuthenicated.middleware");
const isMember = require("../middlewares/isMember.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");
const { signupSchema, loginSchema } = require("../utils/authValidation");
const userController = require("../controllers/user.controller")


// ! get login ans sing-up
authRoute
  .route("/register")
  .post(validationMiddleware(signupSchema), authController.register);

authRoute
  .route("/login")
  .post(validationMiddleware(loginSchema), authController.login);

// get specific user
// ! i am thinkinng if someonee from tech coulld get token and acess someones' id and could be modify theres' need to work in down the road
authRoute.route("/user/:id").get(isAuthenicated, isMember, userController.getUserById);

// update specific user
authRoute.route("/user/:id").patch(isAuthenicated, isMember, userController.updateUserbyId);



authRoute.route("/user").get(isAuthenicated, authController.user);

module.exports = authRoute;
