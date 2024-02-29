import { Router } from "express";

import { verifyToken } from "../Middlewares/verifyToken";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../Controllers/productsController";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", verifyToken, getAllProducts);
productRouter.get("/:id", verifyToken, getOneProduct);
productRouter.put("/update/:id", verifyToken, updateProduct);
productRouter.delete("/delete/:id", verifyToken, deleteProduct);
export default productRouter;
