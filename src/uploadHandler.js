import csv from "csv-parser";
import fs from "fs";
import { productSchema } from "./validation.js";
import { prisma } from "./prismaClient.js";

export async function handleCSVUpload(filePath) {
  return new Promise((resolve, reject) => {
    const validProducts = [];
    const failed = [];

    fs.createReadStream(filePath)
      .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
      .on("data", (row) => {
        try {
          const parsed = productSchema.parse(row);
          validProducts.push(parsed);
        } catch (err) {
    console.log("--- VALIDATION FAILED ---");
    console.log("Failing Row:", row); 
    console.log("Zod Error:", err.flatten());
          failed.push({ row, error: err.errors });
        }
      })
      .on("end", async () => {
        for (const product of validProducts) {
          await prisma.product.upsert({
            where: { sku: product.sku },
            update: product,
            create: product,
          });
        }
        resolve({ stored: validProducts.length, failed });
      })
      .on("error", reject);
  });
}
