const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

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

    it("should create a User object with correct values", (done) => {
      User.create({
        fName: "Richy",
        lName: "Rich",
        email: "richy@example.com",
        password: "123456"
      })
      .then((user) => {
        expect(user.fName).toBe("Richy");
        expect(user.lName).toBe("Rich");
        expect(user.email).toBe("richy@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a User object with incorrect values", (done) => {
      User.create({
        fName: "Mel",
        lName: "Sa",
        email: "onad93-#33",
        password: "123456"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("must be a valid email");
        done();
      })
    })

  }); // End of create()

}); // End of describe
