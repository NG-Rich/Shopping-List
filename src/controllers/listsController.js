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
  },
  create(req, res, next) {
    let newList = {
      title: req.body.title,
      description: req.body.description
    }

    listQuery.createList(newList, (err, list) => {
      if (err) {
        req.flash("notice", "Couldn't create list! Try again!");
        res.redirect("/lists/new");
      }else {
        res.redirect(303, `/lists/${list.id}`);
      }
    })
  },
  show(req, res, next) {
    listQuery.getList(req.params.id, (err, list) => {
      if (err || list == null) {
        req.flash("notice", "Couldn't find list, sorry!");
        res.redirect("/lists");
      }else {
        res.render("lists/show", {list});
      }
    })
  },
  edit(req, res, next) {
    listQuery.getList(req.params.id, (err, list) => {
      if (err || list == null) {
        req.flash("notice", "Couldn't edit list, sorry!");
        res.redirect("/lists");
      }else {
        res.render("lists/edit", {list});
      }
    })
  },
  update(req, res, next) {
    listQuery.updateList(req, req.body, (err, list) => {
      if (err || list == null) {
        req.flash("notice", "Couldn't update list! Try again!");
        res.redirect("/lists");
      }else {
        res.render("lists/show", {list});
      }
    })
  },
  destroy(req, res, next) {
    listQuery.deleteList(req, (err, list) => {
      if (err) {
        req.flash("notice", "Couldn't delete list! Try again!");
        res.redirect("/lists");
      }else {
        req.flash("notice", "List successfully delete!");
        res.redirect(302, "/lists");
      }
    })
  }
}
