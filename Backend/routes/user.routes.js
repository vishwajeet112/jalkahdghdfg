const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();
const { validationSchema } = require("../joiSchema");
const { authorize } = require("../middleware");

// router.use(function timeLog(req, res, next) {
//   console.log("User Route file: ", Date.now());
//   next();
// });

// console.log("Working");

router.route("/user/register").post(userController.register);

router
  .route("/user/login")
  .post(validationSchema.loginSchema, userController.login);

router.route("/user/profile").get(authorize, userController.getProfile);

router.route("/user/update").post(authorize, userController.updateProfile);

// router.post("/submit", complaintController.submitComplaint);

router
  .route("/user/update-password")
  .post(authorize, userController.updatePassword);

module.exports = router;
