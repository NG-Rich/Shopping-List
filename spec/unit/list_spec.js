const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;

describe("List", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  }); // End of beforeEach

  describe("create()", () => {

    it("should create a List object with the correct values", (done) => {
      List.create({
        title: "Groceries",
        description: "Groceries 4 the week"
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
        description: ""
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
