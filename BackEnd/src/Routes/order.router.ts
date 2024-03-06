import { Router } from "express";

import { verifyToken } from "../Middlewares/verifyToken";
import {
  cancelOrder,
  changeStatus,
  createOrder,
  getAllOrders,
  getOrderByUserId,
} from "../Controllers/order.Controller";

const order_Router = Router();
order_Router.post("/", verifyToken, createOrder);
order_Router.get("/", getAllOrders);
order_Router.get("/:user_id", getOrderByUserId);
order_Router.put("/cancel/:order_id", cancelOrder);
order_Router.put("/changeStatus/:order_id", changeStatus);

export default order_Router;
