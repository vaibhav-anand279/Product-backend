import { z } from "zod";

export const productSchema = z
  .object({
    sku: z.string().min(1, "SKU is required"),
    name: z.string().min(1, "Name is required"),
    brand: z.string().min(1, "Brand is required"),
    color: z.string().optional(),
    size: z.string().optional(),
    mrp: z.coerce.number().positive("MRP must be greater than 0"),
    price: z.coerce.number().nonnegative("Price must be 0 or greater"),
    quantity: z.coerce.number().int().nonnegative("Quantity must be 0 or greater"),
  })
  .refine((data) => data.price <= data.mrp, {
    message: "Price cannot exceed MRP",
    path: ["price"], // shows error on price field
  });
