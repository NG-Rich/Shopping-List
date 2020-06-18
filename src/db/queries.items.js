const Items = require("./models").Items;

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

      item.update(updatedItem, {
        fields: Object.keys(updatedItem)
      })
      .then(() => {
        callback(null, item);
      })
      .catch((err) => {
        callback(err);
      })
    })
  },
  deleteItem(req, callback) {
    Items.findByPk(req.params.id)
    .then((item) => {
      item.destroy()
      .then((item) => {
        callback(null, item);
      })
      .catch((err) => {
        callback(err);
      })
    })
  }
}
