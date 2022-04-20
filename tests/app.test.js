const app = require("../app");
const supertest = require("supertest");

describe("GET /", () => {
  describe("when the server is running", () => {
    // should return 200
    it("should return a 200 status code", async () => {
      const response = await supertest(app).get("/");
      expect(response.status).toBe(200);
    });

    // should return a message
    it("should return a message", async () => {
      const response = await supertest(app).get("/");
      expect(response.body.status).toBe("eCommerce scrapper API is running!");
    });

    // should return application/json
    it("should return application/json", async () => {
      const response = await supertest(app).get("/");
      expect(response.type).toBe("application/json");
    });
  });
});
