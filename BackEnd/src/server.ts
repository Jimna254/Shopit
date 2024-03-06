import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import userRouter from "./Routes/user.router";
import auth_Router from "./Routes/auth.routers";
import productRouter from "./Routes/product.router";
import categoryRouter from "./Routes/category.router";
import cart_Router from "./Routes/cart.routes";
import order_Router from "./Routes/order.router";

const app = express();

app.use(cors());
app.use(json());
app.use("/users", userRouter);
app.use("/users", auth_Router);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/cart", cart_Router);
app.use("/order", order_Router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.toString() });
  console.log(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.toString() });
  console.log(error);
});

const port: number | string = process.env.PORT || 3110;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
