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
        fname: "Richy",
        lname: "Rich",
        email: "richy@example.com",
        password: "123456"
      })
      .then((user) => {
        expect(user.fname).toBe("Richy");
        expect(user.lname).toBe("Rich");
        expect(user.email).toBe("richy@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  }); // End of create()

}); // End of describe
