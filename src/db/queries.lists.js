const List = require("./models").List;
const Items = require("./models").Items;

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
  createList(newList, callback) {
    List.create({
      title: newList.title,
      description: newList.description
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

      list.update(updatedList, {
        fields: Object.keys(updatedList)
      })
      .then(() => {
        callback(null, list);
      })
      .catch((err) => {
        callback(err);
      });

    });
  },
  deleteList(req, callback) {
    List.findByPk(req.params.id)
    .then((list) => {
      list.destroy()
      .then((list) => {
        callback(null, list);
      })
      .catch((err) => {
        callback(err);
      })
    })
  }
}
