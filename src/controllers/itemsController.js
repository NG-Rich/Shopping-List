const itemQuery = require("../db/queries.items.js");
const Authorizer = require("../policies/application");

module.exports = {
  create(req, res, next) {
    const authorized = new Authorizer(req.user).new();

    if (authorized) {
      let newItem = {
        name: req.body.name,
        purchased: req.body.purchased,
        listId: req.params.id
      }

      itemQuery.createItem(newItem, (err, item) => {
        if (err) {
          req.flash("notice", "Couldn't create item! Try again!");
          res.redirect(`/lists/${newItem.listId}`);
        }else {
          req.flash("notice", "Item successfully added!");
          res.redirect(`/lists/${newItem.listId}`);
        }
      });
    }else {
      req.flash("notice", "You must be signed in to do this!");
      res.redirect("/users/sign_in");
    }
  },
  edit(req, res, next) {
    itemQuery.getItem(req, (err, item) => {
      if (err || item == null) {
        req.flash("notice", "Couldn't find item!");
        res.redirect("/lists");
      }else {
        const authorized = new Authorizer(req.user).new();

        if (authorized) {
          res.render(`item/edit`, {item});
        }else {
          req.flash("notice", "You must be signed in to do this!");
          res.redirect("/users/sign_in");
        }
      }
    });
  },
  update(req, res, next) {
    itemQuery.updateItem(req, req.body, (err, item) => {
      if (err) {
        req.flash("notice", "Couldn't update item!");
        res.redirect("/lists");
      }else {
        res.redirect(`/lists/${item.listId}`);
      }
    });
  },
  destroy(req, res, next) {
    itemQuery.deleteItem(req, (err, item) => {
      if (err) {
        req.flash("notice", "Couldn't delete item!");
        res.redirect("/lists");
      }else {
        req.flash("notice", "Successfully deleted item!");
        res.redirect(req.headers.referer);
      }
    })
  },
  changePurchase() {
    document.getElementById('purchaseItem').value = true;
    console.log("this was called!");
  }
}
