const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;

describe("List", () => {

  beforeEach((done) => {
    this.user;
    this.list;

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
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  }); // End of beforeEach

  describe("create()", () => {

    it("should create a List object with the correct values", (done) => {
      List.create({
        title: "Groceries",
        description: "Groceries 4 the week",
        userId: this.user.id
      })
      .then((list) => {
        expect(list.title).toBe("Groceries");
        expect(list.description).toBe("Groceries 4 the week");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    }); // End of it

    it("should not create a List object with incorrect values", (done) => {
      List.create({
        title: "Groceries",
        description: "",
        userId: this.user.id
      })
      .then((list) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("description should not be empty");
        done();
      });
    });

  }); // End of list create()

}); // End of List describe
