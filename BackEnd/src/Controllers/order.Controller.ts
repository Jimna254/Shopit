import { Request, Response } from "express";
import { v4 } from "uuid";
import { Orders } from "../Interfaces/orderInterface";
import mssql from "mssql";
import bcrypt from "bcrypt";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";

// create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Order:", id);
    const { cart_id, user_id }: Orders = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);
    const createOrder = (
      await pool
        .request()
        .input("order_id", mssql.VarChar, id)
        .input("cart_id", mssql.VarChar, cart_id)
        .input("user_id", mssql.VarChar, user_id)
        .execute("createOrder")
    ).rowsAffected;

    console.log(createOrder);
    return res.status(201).json({ message: "Order created succesfully." });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

//Dbhelper get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    let orders = (await Connection.execute("getAllOrders")).recordset;

    if (orders.length > 0) {
      return res.json({
        orders,
      });
    } else {
      return res.json({
        message: "No orders found",
      });
    }
  } catch (error: any) {
    return res.json({
      error: error.originalError.info.message,
    });
  }
};

//Dbhelper get orders by user_id

export const getOrderByUserId = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    console.log("User ID:", user_id);

    let orderDetails = (
      await Connection.execute("getOrderByUserId", { user_id: user_id })
    ).recordset;

    if (orderDetails.length === 0) {
      return res.status(200).json({ message: "You have no orders." });
    }

    return res.json({ orderDetails });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving the orders." });
  }
};

//Dbhelper cancel order

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.order_id;
    console.log("Order ID:", id);
    let order = (await Connection.execute("cancelOrder", { order_id: id }))
      .recordset;

    return res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue cancelling order" });
  }
};

//Dbhelper to change status from Pending to In transit

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.order_id;
    console.log("Order ID:", id);
    let order = (await Connection.execute("changeStatus", { order_id: id }))
      .recordset;

    return res.json({ message: "Order is now in transit" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue in chnaging status" });
  }
};
