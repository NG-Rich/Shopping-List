const listQuery = require("../db/queries.lists.js");
const Authorizer = require("../policies/application");

module.exports = {
  index(req, res, next) {
    const authorized = new Authorizer(req.user).new();

    if (authorized) {
      listQuery.getAllLists((err, lists) => {
        if (err) {
          req.flash("notice", "Couldn't display lists!");
          res.redirect("/");
        }else {
          res.render("lists/index", {lists});
        }
      });
    }else {
      req.flash("notice", " You must be signed in to view lists!");
      res.redirect("/users/sign_in");
    }
  },
  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();

    if (authorized) {
      res.render("lists/new");
    }else {
      req.flash("notice", "You must be signed in create a list!");
      res.redirect("/users/sign_in");
    }
  },
  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();

    if (authorized) {
      let newList = {
        title: req.body.title,
        description: req.body.description,
        userId: req.user.id
      }

      listQuery.createList(req, newList, (err, list) => {
        if (err) {
          req.flash("notice", "Couldn't create list! Try again!");
          res.redirect("/lists/new");
        }else {
          res.redirect(303, `/lists/${list.id}`);
        }
      });
    }else {
      req.flash("notice", "You must be signed in to create lists!");
      res.redirect("/users/sign_in");
    }
  },
  show(req, res, next) {
    listQuery.getList(req.params.id, (err, list) => {
      const authorized = new Authorizer(req.user, list).edit();

      if(authorized) {
        if (err || list == null) {
          req.flash("notice", "Couldn't find list, sorry!");
          res.redirect("/lists");
        }else {
          res.render("lists/show", {list});
        }
      }else {
        req.flash("notice", "You must be signed in to view lists!");
        res.redirect("/users/sign_in");
      }
    })
  },
  edit(req, res, next) {
    listQuery.getList(req.params.id, (err, list) => {
      if (err || list == null) {
        req.flash("notice", "Couldn't edit list, sorry!");
        res.redirect("/lists");
      }else {
        const authorized = new Authorizer(req.user, list).edit();

        if (authorized) {
          res.render("lists/edit", {list});
        }else {
          req.flash("notice", "You must be signed in to edit lists!");
          res.redirect("/users/sign_in");
        }
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
