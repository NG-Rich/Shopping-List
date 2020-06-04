const axios = require("axios");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  describe("GET /", () => {

    it("should return status code 200", (done) => {
      axios.get(base)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data).toContain("Welcome to Kart!");
        done();
      });
    });
  });

});
