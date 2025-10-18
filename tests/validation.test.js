
import { productSchema } from "../src/validation.js";

describe("Product Validation", () => {
  test("valid product passes", () => {
    const product = {
      sku: "TSHIRT-RED-001",
      name: "Classic Cotton T-Shirt",
      brand: "StreamThreads",
      color: "Red",
      size: "M",
      mrp: "799",
      price: "499",
      quantity: "20",
    };
    const result = productSchema.parse(product);
    expect(result.sku).toBe("TSHIRT-RED-001");
  });

  test("price cannot exceed mrp", () => {
    const product = {
      sku: "BAD-PRODUCT",
      name: "Test Shirt",
      brand: "TestBrand",
      mrp: "500",
      price: "999",
      quantity: "2",
    };
    expect(() => productSchema.parse(product)).toThrow();
  });
});
