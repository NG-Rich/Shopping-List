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

  describe("POST /lists", () => {

    it("should create a List object an redirect", (done) => {
      const options = {
        url: `${base}create`,
        form : {
          title: "Groceries",
          description: "Groceries 4 the week"
        }
      }

      request.post(options, (err, res, body) => {
        List.findOne({where: {title: "Groceries"}})
        .then((list) => {
          expect(res.statusCode).toBe(303);
          expect(list.title).toBe("Groceries");
          expect(list.description).toBe("Groceries 4 the week");
          expect(list.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })
    });

  }); // End of POST/lists

  describe("GET /lists/:id", () => {

    it("should render a view for the selected List object", (done) => {
      request.get(`${base}${this.list.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Groceries");
        done();
      });
    });

  }); // End of GET/lists/show

  describe("GET /lists/:id/edit", () => {

    it("should render a edit view for the selected list", (done) => {
      request.get(`${base}:id/edit`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Groceries");
        expect(body).toContain("Groceries 4 the week");
        done();
      })
    });

  }); // End of GET/lists/edit

  describe("POST /lists/:id/update", () => {

    it("should update the List object with new values", (done) => {
      const options = {
        url: `${base}${this.list.id}/update`,
        form: {
          title: "Stuff",
          description: "Stuff I need"
        }
      }

      request.post(options, (err, res, body) => {
        List.findOne({where: {id: this.list.id}})
        .then((list) => {
          expect(list.title).toBe("Stuff");
          expect(list.description).toBe("Stuff I need");
          done();
        });
      });
    });

  }); // End of POST/lists/update

  describe("POST /lists/:id/destroy", () => {

    it("should delete the list with the selected ID", (done) => {
      List.findAll()
      .then((lists) => {
        const listCountBeforeDelete = lists.length;
        expect(listCountBeforeDelete).toBe(1);

        request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
          List.findAll()
          .then((lists) => {
            expect(err).toBeNull();
            expect(res.statusCode).toBe(302);
            expect(lists.length).toBe(listCountBeforeDelete - 1);
            done();
          })
        });
      })
    });

  }); // End of POST/lists/destroy

}); // End of routes:lists
