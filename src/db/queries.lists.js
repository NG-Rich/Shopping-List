const List = require("./models").List;
const Items = require("./models").Items;
const Authorizer = require("../policies/application");

module.exports = {
  getAllLists(callback) {
    List.findAll()
    .then((lists) => {
      callback(null, lists);
    })
    .catch((err) => {
      callback(err);
    });
  },
  createList(req, newList, callback) {
    List.create({
      title: newList.title,
      description: newList.description,
      userId: req.user.id
    })
    .then((list) => {
      callback(null, list);
    })
    .catch((err) => {
      callback(err);
    });
  },
  getList(id, callback) {
    List.findByPk(id, {
      include: [{
        model: Items,
        as: "items"
      }]
    })
    .then((list) => {
      callback(null, list);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateList(req, updatedList, callback) {
    List.findByPk(req.params.id)
    .then((list) => {
      const authorized = new Authorizer(req.user, list).update();

      if (authorized) {
        list.update(updatedList, {
          fields: Object.keys(updatedList)
        })
        .then(() => {
          callback(null, list);
        })
        .catch((err) => {
          callback(err);
        });
      }else {
        callback("Forbidden");
      }
    });
  },
  deleteList(req, callback) {
    List.findByPk(req.params.id)
    .then((list) => {
      const authorized = new Authorizer(req.user, list).destroy();

      if (authorized) {
        list.destroy()
        .then((list) => {
          callback(null, list);
        })
        .catch((err) => {
          callback(err);
        });
      }else {
        callback("Forbidden");
      }
    });
  }
}
