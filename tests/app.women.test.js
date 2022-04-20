const supertest = require("supertest");
const app = require("../app");
const { women_categories, women_has_types } = require("../models");

describe("GET /women", () => {
  describe("when a request is made to /women endpoint", () => {
    it("should return 200 status code", async () => {
      const response = await supertest(app).get("/women");
      expect(response.status).toBe(200);
    });

    it("should contain an items object", async () => {
      const response = await supertest(app).get("/women");
      expect(response.body.items).toBeDefined();
    });

    it("should return application/json", async () => {
      const response = await supertest(app).get("/women");
      expect(response.type).toBe("application/json");
    });
  });
});

// Testing men category
describe("GET /women?category", () => {
  describe("when a request is made to the category endpoints", () => {
    it("should return a 200 status code", async () => {
      const response = await supertest(app).get("/women?category");
      expect(response.status).toBe(200);
    });

    for (const cats of women_categories) {
      it("should contain an items object", async (category = cats) => {
        const response = await supertest(app).get(
          `/women?category=${category}`
        );
        expect(response.body.items).toBeDefined();
      });

      it("should contain a specific category iten", async (category = cats) => {
        const response = await supertest(app).get(
          `/women?category=${category}`
        );
        expect(response.body.category).toBe(category);
      });

      it("should contain at least 10 items", async (category = cats) => {
        const response = await supertest(app).get(
          `/women?category=${category}`
        );
        expect(response.body.count).toBeGreaterThanOrEqual(10);
      });

      it("should return application/json", async (category = cats) => {
        const response = await supertest(app).get(
          `/women?category=${category}`
        );
        expect(response.type).toBe("application/json");
      });
    }
  });
});

// Testing all women type endpoints
describe("GET /women?category&type", () => {
  describe("when a request is made to the category endpoints with type", () => {
    it("should return a 200 status code", async () => {
      const response = await supertest(app).get("/women?category=jeans");
      expect(response.status).toBe(200);
    });

    for (const key in women_has_types) {
      for (const type of women_has_types[key]) {
        it("should contain an items object", async (category = key) => {
          const response = await supertest(app).get(
            `/women?category=${category}&type=${type}`
          );
          expect(response.body.items).toBeDefined();
        });

        it("should contain a specific category iten", async (category = key) => {
          const response = await supertest(app).get(
            `/women?category=${category}&type=${type}`
          );
          expect(response.body.type).toBe(type);
        });

        it("should contain at least 10 items", async (category = key) => {
          const response = await supertest(app).get(
            `/women?category=${category}&type=${type}`
          );
          expect(response.body.count).toBeGreaterThanOrEqual(10);
        });

        it("should return application/json", async (category = key) => {
          const response = await supertest(app).get(
            `/women?category=${category}&type=${type}`
          );
          expect(response.type).toBe("application/json");
        });
      }
    }
  });

  //
});
