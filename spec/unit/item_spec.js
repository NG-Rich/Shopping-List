const sequelize = require("../../src/db/models/index").sequelize;
const Items = require("../../src/db/models").Items;
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;

describe("Item", () => {

  beforeEach((done) => {
    this.user;
    this.list;
    this.item;

    sequelize.sync({force: true})
    .then((res) => {
      User.create({
        fName: "Richy",
        lName: "Rich",
        email: "rich@example.com",
        password: "123456"
      })
      .then((user) => {
        this.user = user;

        List.create({
          title: "Groceries",
          description: "Groceries 4 the week",
          userId: this.user.id
        })
        .then((list) => {
          this.list = list;

          Items.create({
            name: "Chips",
            purchased: false,
            listId: this.list.id
          })
          .then((item) => {
            this.item = item;
            done();
          })
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
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
