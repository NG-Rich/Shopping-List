const passport = require("passport");
const userQuery = require("../db/queries.users.js");

module.exports = {
  signUp(req, res, next) {
    res.render("users/sign_up");
  },
  create(req, res, next) {
    let newUser = {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    }

    userQuery.createUser(newUser, (err, user) => {
      if(err) {
        req.flash("error", err);
        res.redirect("/users/sign_up");
      }else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've signed up!");
          res.redirect("/");
        });
      }
    });
  }
}
