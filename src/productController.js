import { prisma } from "./prismaClient.js";

export const listProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;


const products=await prisma.product.findMany({
  skip: skip,
  take: limit,
});

const total= await prisma.product.count();

res.json({
  page: page,
  limit: limit,
  total: total,
  products: products,
});
}
export const searchProducts = async (req,res) =>{
  const {brand,color,minPrice,maxPrice }=req.query;

  const filters ={};

if (brand) {

    filters.brand = {
      contains: brand,
      mode: "insensitive"
    };
  }

  if (color) {
    
    filters.color = {
      contains: color,
      mode: "insensitive"
    };
  }

  // Edit: Add validation for price filters
  if (minPrice || maxPrice){
    filters.price ={};

    if(minPrice) {
      const minPriceFloat = parseFloat(minPrice);
      if (isNaN(minPriceFloat)) {
        return res.status(400).json({ error: "Invalid minPrice. Must be a number." });
      }
      filters.price.gte = minPriceFloat;
    }

    if(maxPrice) {
      const maxPriceFloat = parseFloat(maxPrice);
      if (isNaN(maxPriceFloat)) {
        return res.status(400).json({ error: "Invalid maxPrice. Must be a number." });
      }
      filters.price.lte = maxPriceFloat;
    }
  }
  // End Edit

  try {
    const products=await prisma.product.findMany({ where: filters });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};
