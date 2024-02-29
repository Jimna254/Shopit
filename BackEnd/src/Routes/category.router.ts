import { Router } from "express";

import { verifyToken } from "../Middlewares/verifyToken";
import {
  createCategory,
  deleteCategory,
  getOneCategory,
  getallCategories,
  updateCategory,
} from "../Controllers/category.Controller";

const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", verifyToken, getallCategories);
categoryRouter.get("/:id", verifyToken, getOneCategory);
categoryRouter.put("/update/:id", verifyToken, updateCategory);
categoryRouter.delete("/delete/:id", verifyToken, deleteCategory);
export default categoryRouter;
