const sequelize = require("../../src/db/models/index").sequelize;
const Items = require("../../src/db/models").Items;
const List = require("../../src/db/models").List;

describe("Item", () => {

  beforeEach((done) => {
    this.list;

    sequelize.sync({force: true})
    .then((res) => {
      List.create({
        title: "Groceries",
        description: "Groceries 4 the week"
      })
      .then((list) => {
        this.list = list;
        done();
      })
    })
    .catch((err) => {
      console.log(err);
      done();
    })
  }); // End of beforeEach

  describe("create()", () => {

    it("should create an Item object with the correct values", (done) => {
      Items.create({
        name: "Chips",
        purchased: false,
        listId: this.list.id
      })
      .then((item) => {
        expect(item.name).toBe("Chips");
        expect(item.listId).toBe(1);
        done();
      })
    }); // End of it

  }); // End of create()

}); // End of describe
