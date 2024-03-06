import { Router } from "express";

import { verifyToken } from "../Middlewares/verifyToken";
import {
  checkoutCart,
  createCart,
  deleteItemCart,
  getCartbyUserid,
} from "../Controllers/cartController";

const cart_Router = Router();
cart_Router.post("/", verifyToken, createCart);
cart_Router.get("/:id", getCartbyUserid);
cart_Router.delete("/delete/:cart_id", deleteItemCart);
cart_Router.put("/checkout/:cart_id", checkoutCart);
export default cart_Router;
