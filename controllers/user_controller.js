const User = require("../models/user");

//render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_up", {
    title: "Sign Up Page",
  });
};

//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_in", {
    title: "Sign In Page",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//get the sign in data
module.exports.createSession = function (req, res) {

    // User.findOne({email: req.body.email}, function(err, user){
  //     if(err){console.log('error in finding user in signing in'); return}
  //     // handle user found
  //     if (user){

  //         // handle password which doesn't match
  //         if (user.password != req.body.password){
  //             return res.redirect('back');
  //         }

  //         // handle session creation
  //         res.cookie('user_id', user.id);
  //         return res.redirect('/');

  //     }else{
  //         // handle user not found

  //         return res.redirect('back');
  //     } 
  // });
  console.log("login ho gya");
  return res.redirect("/");

};

//sign-out
module.exports.destroySession = function (req, res) {
  req.logout();
  // req.flash("success", "Logged Out!");
  console.log("success", "Logged Out!");
  return res.redirect("/");
};

