import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";
import { Cart } from "../Interfaces/cartInterface";

export const createCart = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Cart:", id);
    const { user_id, product_id, total_price, quantity } = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("user_id", mssql.VarChar, user_id)
      .execute("CheckCartExists");

    console.log("Your result", result.recordset.length);

    if (result.recordset.length >= 1) {
      const productCheck = await pool
        .request()
        .input("cart_id", mssql.VarChar, result.recordset[0].cart_id)
        .input("product_id", mssql.VarChar, product_id)
        .execute("CheckProductInCart");

      if (productCheck.recordset.length > 0) {
        return res
          .status(400)
          .json({ message: "Product exists in cart, please update quantity." });
      } else {
        const addProductToCart = await pool
          .request()
          .input("cart_id", mssql.VarChar, result.recordset[0].cart_id)
          .input("product_id", mssql.VarChar, product_id)
          .input("quantity", mssql.Int, quantity)
          .execute("addProductToCart");

        console.log(addProductToCart);
        return res
          .status(200)
          .json({ message: "Product added to cart successfully." });
      }
    } else {
      // If cart does not exist, create a new cart and add the product
      const createCart = await pool
        .request()
        .input("cart_id", mssql.VarChar, id)
        .input("product_id", mssql.VarChar, product_id)
        .input("user_id", mssql.VarChar, user_id)
        .input("total_price", mssql.Numeric, total_price)
        .execute("createCart");

      console.log(createCart);
      return res.status(201).json({ message: "Cart created successfully." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
//get one Category
export const getCartbyUserid = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    let Cartitems = (
      await Connection.execute("getCartbyUserId", {
        user_id: id,
      })
    ).recordset;

    if (Cartitems.length === 0) {
      return res.status(200).json({ message: "Cart is empty." });
    }

    return res.json({ Cartitems });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving Cart" });
  }
};

export const deleteItemCart = async (req: Request, res: Response) => {
  try {
    const cart_id = req.params.cart_id;
    const product_id = req.body.product_id;

    console.log("Cart ID:", cart_id, "Product ID:", product_id);

    let result = await Connection.execute("deleteItemCart", {
      cart_id: cart_id,
      product_id: product_id,
    });

    console.log("Result:", result);
    return res.json({ message: "Product removed from cart successfully." });
  } catch (error) {
    console.log("Error in removing product from database", error);
    return res.status(400).json({
      message: "Error in removingg product from database",
    });
  }
};

export const checkoutCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.cart_id;
    console.log("Cart ID found:", id);
    let cart = await Connection.execute("checkoutCart", { cart_id: id });

    return res.json({
      message: "Cart checkout success! Order is being processed",
    });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue checking out cart" });
  }
};
