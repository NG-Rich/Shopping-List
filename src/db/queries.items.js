const Items = require("./models").Items;
const Authorizer = require("../policies/application");

module.exports = {
  createItem(newItem, callback) {
    Items.create(newItem)
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getItem(req, callback) {
    Items.findByPk(req.params.id)
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateItem(req, updatedItem, callback) {
    Items.findByPk(req.params.id)
    .then((item) => {
      const authorized = new Authorizer(req.user).new();

      if (authorized) {
        item.update(updatedItem, {
          fields: Object.keys(updatedItem)
        })
        .then(() => {
          callback(null, item);
        })
        .catch((err) => {
          callback(err);
        })
      }else {
        callback("Forbidden");
      }

    })
  },
  deleteItem(req, callback) {
    Items.findByPk(req.params.id)
    .then((item) => {
      const authorized = new Authorizer(req.user).new();

      if (authorized) {
        item.destroy()
        .then((item) => {
          callback(null, item);
        })
        .catch((err) => {
          callback(err);
        })
      }else {
        callback("Forbidden");
      }

    })
  }
}
