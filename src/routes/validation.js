const User = require("../db/models").User;

module.exports = {
  validateNewUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("fName", "must not be empty").notEmpty();
      req.checkBody("lName", "must not by empty").notEmpty();
      req.checkBody("email", "must be a valid email").isEmail();
      /* Reevaluate for duplicate emails
      req.checkBody("email", "is taken!").custom(value => {
        let user = User.findOne({where: {email: value}});

        if(user == false) {
          return false;
        }
      })
      */
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
      req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    }else {
      return next();
    }
  },
  validateUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("email", "is not valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    }else {
      return next();
    }
  }
}
