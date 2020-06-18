const itemQuery = require("../db/queries.items.js");

module.exports = {
  create(req, res, next) {
    let newItem = {
      name: req.body.name,
      purchased: false,
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


  },
  edit(req, res, next) {
    itemQuery.getItem(req, (err, item) => {
      if (err || item == null) {
        req.flash("notice", "Couldn't find item!");
        res.redirect("/lists");
      }else {
        res.render(`item/edit`, {item});
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
  }
}
