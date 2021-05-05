const express = require("express");
const router = express.Router();
const passport = require("passport");

const usercontroller = require("../controllers/user_controller");
router.post("/create", usercontroller.create);

//use passport  as a middleware to authenticate
router.post("/create-session",passport.authenticate(
    'local', {failureRedirect: "/users/sign-in",}
  ), usercontroller.createSession);

router.get("/sign-up", usercontroller.signUp);
router.get("/sign-in", usercontroller.signIn);

router.get("/sign-out", usercontroller.destroySession);

module.exports = router;
