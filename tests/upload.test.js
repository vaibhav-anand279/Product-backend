
import fs from "fs";
import path from "path";
import { jest } from '@jest/globals';
import { handleCSVUpload } from "../src/uploadHandler.js";

jest.setTimeout(20000);

describe("CSV Upload", () => {
  test("parses valid CSV correctly", async () => {
    const filePath = path.join(process.cwd(), "tests", "test_products.csv");

    // create small sample CSV file
    fs.writeFileSync(
      filePath,
      `sku,name,brand,color,size,mrp,price,quantity
TSHIRT-RED-001,Classic Cotton T-Shirt,StreamThreads,Red,M,799,499,20`
    );

    const result = await handleCSVUpload(filePath);
    expect(result.stored).toBe(1);
    expect(result.failed.length).toBe(0);

    fs.unlinkSync(filePath); // cleanup
  });
});
