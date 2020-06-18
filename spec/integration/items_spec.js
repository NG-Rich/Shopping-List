const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const List = require("../../src/db/models").List;
const Items = require("../../src/db/models").Items;

describe("routes : items", () => {

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
          description: "Groceries 4 the week"
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

  describe("POST /lists/:id/item/create", () => {

    it("should create an Item object and redirect", (done) => {
      const options = {
        url: `${base}${this.list.id}/item/create`,
        form: {
          name: "Chips",
          purchased: false,
          listId: this.list.id
        }
      }

      request.post(options, (err, res, body) => {
        Items.findOne({where: {name: "Chips"}})
        .then((items) => {
          expect(res.statusCode).toBe(302);
          expect(items.name).toBe("Chips");
          expect(items.listId).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      });
    });

  }); // End of POST/lists/item

  describe("GET /lists/:listId/item/edit", () => {

    it("should render a view for editing an Item", (done) => {
      request.get(`${base}${this.list.id}/item/${this.item.id}/edit`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Edit Item");
        done();
      });
    });

  }); // End of GET/lists/item/edit

  describe("POST /lists/:listId/item/update", () => {

    it("should update the Item and redirect", (done) => {
      const options = {
        url: `${base}${this.list.id}/item/${this.item.id}/update`,
        form: {
          name: "Milk",
          purchased: false,
          listId: this.list.id
        }
      }

      request.post(options, (err, res, body) => {
        Items.findOne({where: {name: "Milk"}})
        .then((item) => {
          expect(res.statusCode).toBe(302);
          expect(item.name).toBe("Milk");
          done();
        })
      })
    });

  }); // End of POST/lists/item/update

  describe("POST /lists/:listId/item/destroy", () => {

    it("should delete the selected Item", (done) => {
      Items.findAll()
      .then((item) => {
        const itemCountBeforeDelete = item.length;
        expect(itemCountBeforeDelete).toBe(1);

        request.post(`${base}${this.list.id}/item/${this.item.id}/destroy`, (err, res, body) => {
          Items.findAll()
          .then((item) => {
            expect(err).toBeNull();
            expect(res.statusCode).toBe(302);
            expect(item.length).toBe(itemCountBeforeDelete - 1);
            done();
          })
        })
      })
    });

  }); // End of POST/lists/item/destroy

}); // End of describe
