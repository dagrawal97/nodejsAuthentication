const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../models/user");
//library which help to hash passwords
const bcrypt = require("bcrypt");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //find a user and establish a identity
      console.log("passlocal");
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }
        console.log("passlocal2");
        if (!user) {
            req.flash('error', 'Invalid Username/Password');
            // console.log("error", "Invalid Username/Password");
            return done(null, false);
          }
        bcrypt.compare(password, user.password, function (error, isMatch) {
          if (error) {
            req.flash("error", "Invalid Username/Password, please try again");
            console.log("error", "Invalid Username/Password");
            return done(err);
          }
          if (isMatch) {        

            if (user.isVerified) {
              req.flash("success", "verified done");
              return done(null, user);
            } else {
              req.flash(
                "error",
                "User isn't verified yet, Please check your mail, verify it and then try to sign in"
              );
              return done(null, false);
            }
          }          
          req.flash("error", "Invalid Username/Password, please try again");
          return done(null, false);
        });
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    }
    console.log("deserializeUser");
    return done(null, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in, then pass on the request to the next function(controller's ation)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not sign in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contain the current sign in user from the session cookie and we are just sending this to
    // the locals for the views
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
