const listQuery = require("../db/queries.lists.js");

module.exports = {
  index(req, res, next) {
    listQuery.getAllLists((err, lists) => {
      if (err) {
        req.flash("notice", "Couldn't display lists!");
        res.redirect("/");
      }else {
        res.render("lists/index", {lists});
      }
    });
  },
  new(req, res, next) {
    res.render("lists/new");
  }
}
