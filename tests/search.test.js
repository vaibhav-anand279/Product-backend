import request from "supertest";
import app from "../src/index.js";

describe("Search Products API", () => {
  test("should return array of products for valid filter", async () => {
    const res = await request(app).get("/products/search?brand=Ethniq");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

 // In tests/search.test.js
test("should handle invalid filters gracefully", async () => {
  const res = await request(app).get("/products/search?minPrice=abc");

  // Fix: Expect a 400 Bad Request, not 200
  expect(res.status).toBe(400); 

  // Fix: Expect the JSON error object
  expect(res.body).toEqual({ error: "Invalid minPrice. Must be a number." }); 
});
});
