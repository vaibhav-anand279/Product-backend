import express from "express";
import multer from "multer";
import { handleCSVUpload } from "./uploadHandler.js";
import { listProducts, searchProducts } from "./productController.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await handleCSVUpload(req.file.path);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/products", listProducts);
router.get("/products/search", searchProducts);

export default router;
