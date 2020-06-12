const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const List = require("../../src/db/models").List;

describe("routes : lists", () => {

  beforeEach((done) => {
    this.user;
    this.list;

    sequelize.sync({force: true})
    .then((res) => {
      User.create({
        fName: "Rich",
        lName: "Rich",
        email: "richy@example.com",
        password: "123456"
      })
      .then((user) => {
        this.user = user;

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
      });
    });
  }); // End of beforeEach

  describe("GET /lists", () => {

    it("should return status code 200 and render lists view with lists", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("My Lists");
        expect(body).toContain("Groceries");
        done();
      });
    }); // End of it

  }); // End of GET/lists

  describe("GET /lists/new", () => {

    it("should return status code 200 and render new List view", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("New List");
        done();
      });

    }); // End of it

  }); // End of GET/lists/news

}); // End of routes:lists
