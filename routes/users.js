const express = require("express");
const router = express.Router();
const passport = require("passport");

const usercontroller = require("../controllers/user_controller");

//signup a user
router.get("/sign-up", usercontroller.signUp);

//create a user
router.post("/create", usercontroller.create);

//to verify user
router.get("/verify-user/:token", usercontroller.verifyUser);

//signin a user
router.get("/sign-in", usercontroller.signIn);

//use passport  as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usercontroller.createSession
);

//logout a user
router.get("/sign-out", usercontroller.destroySession);

//sign in user reset password
router.get("/reset-password/:token", usercontroller.resetPasswordForm);

//password reset Form and send email
router.post(
  "/reset-password-action/:token",
  usercontroller.resetPasswordAction
);

//forgot password
router.get("/forgot-password", usercontroller.forgotPassword);

//forgot password and send email
router.post("/forgot-password-action", usercontroller.forgotPasswordAction);

//reset password
router.get("/reset-password-signed-in", usercontroller.resetPasswordForm);

//reset after sign in
router.post(
  "/reset-password-signed-in",
  usercontroller.resetPasswordAfterSignIn
);

//google Oauth sign in/up
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//google callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usercontroller.createSession
);

module.exports = router;
