const supertest = require("supertest");
const app = require("../app");
const { men_brands, men_categories, men_has_types } = require("../models");

//Testing root
describe("GET /men", () => {
  describe("when a request is made to /men endpoint", () => {
    it("should return 200 status code", async () => {
      const response = await supertest(app).get("/men");
      expect(response.status).toBe(200);
    });

    it("should contain an items object", async () => {
      const response = await supertest(app).get("/men");
      expect(response.body.items).toBeDefined();
    });

    it("should return application/json", async () => {
      const response = await supertest(app).get("/men");
      expect(response.type).toBe("application/json");
    });
  });
});

// Testing all brands
describe("GET /men?brand", () => {
  describe("when a request is made to /men?brand endpoint", () => {
    it("should return 200 status code", async () => {
      const response = await supertest(app).get("/men?brand");
      expect(response.status).toBe(200);
    });

    it("should contain an items object", async () => {
      const response = await supertest(app).get("/men?brand");
      expect(response.body.items).toBeDefined();
    });

    for (const brand of men_brands) {
      it("should contain an items object", async () => {
        const response = await supertest(app).get(`/men?brand=${brand}`);
        expect(response.body.items).toBeDefined();
      });

      it("should contain the brand name in item title", async () => {
        const response = await supertest(app).get(`/men?brand=${brand}`);
        var title = response.body.items[0].title
          .toLowerCase()
          .replace(/\s/g, "");
        var formatedBrand = brand.toLowerCase().replace(/\s/g, "");
        expect(title).toContain(formatedBrand);
      });

      it("should contain at least 10 items", async () => {
        const response = await supertest(app).get(`/men?brand=${brand}`);
        expect(response.body.count).toBeGreaterThanOrEqual(10);
      });

      it("should return application/json", async () => {
        const response = await supertest(app).get(`/men?brand=${brand}`);
        expect(response.type).toBe("application/json");
      });
    }
  });
});

// Testing all categories
describe("GET /men?category", () => {
  describe("when a request is made to the category endpoints", () => {
    it("should return a 200 status code", async () => {
      const response = await supertest(app).get("/men?category");
      expect(response.status).toBe(200);
    });

    for (const cats of men_categories) {
      it("should contain an items object", async (category = cats) => {
        const response = await supertest(app).get(`/men?category=${category}`);
        expect(response.body.items).toBeDefined();
      });

      it("should contain a specific category iten", async (category = cats) => {
        const response = await supertest(app).get(`/men?category=${category}`);
        expect(response.body.category).toBe(category);
      });

      it("should contain at least 10 items", async (category = cats) => {
        const response = await supertest(app).get(`/men?category=${category}`);
        expect(response.body.count).toBeGreaterThanOrEqual(10);
      });

      it("should return application/json", async (category = cats) => {
        const response = await supertest(app).get(`/men?category=${category}`);
        expect(response.type).toBe("application/json");
      });
    }
  });
});

// Testing all men type endpoints
describe("GET /men?category&type", () => {
  describe("when a request is made to the category endpoints with type", () => {
    it("should return a 200 status code", async () => {
      const response = await supertest(app).get("/men?category=jeans");
      expect(response.status).toBe(200);
    });

    for (const key in men_has_types) {
      for (const type of men_has_types[key]) {
        it("should contain an items object", async (category = key) => {
          const response = await supertest(app).get(
            `/men?category=${category}&type=${type}`
          );
          expect(response.body.items).toBeDefined();
        });

        it("should contain a specific category iten", async (category = key) => {
          const response = await supertest(app).get(
            `/men?category=${category}&type=${type}`
          );
          expect(response.body.type).toBe(type);
        });

        it("should contain at least 10 items", async (category = key) => {
          const response = await supertest(app).get(
            `/men?category=${category}&type=${type}`
          );
          expect(response.body.count).toBeGreaterThanOrEqual(10);
        });

        it("should return application/json", async (category = key) => {
          const response = await supertest(app).get(
            `/men?category=${category}&type=${type}`
          );
          expect(response.type).toBe("application/json");
        });
      }
    }
  });
});
