const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

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

  describe("GET /users", () => {

    it("should return a status code 200 and render sign up page", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toContain("Create an account");
        done();
      });
    });

    it("should return a status code 200 and render a sign in page", (done) => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Sign in to Kart");
        done();
      });
    })

  }); // End GET /users

  describe("POST /users", () => {

    it("should create a User and redirect", (done) => {
      const options = {
        url: base,
        form: {
          fName: "Richy",
          lName: "Rich",
          email: "richy@example.com",
          password: "123456"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({where: {email: "richy@example.com"}})
        .then((user) => {
          expect(user).not.toBeNull();
          expect(user.email).toBe("richy@example.com");
          expect(user.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

    });

  }); // End POST /users

});
