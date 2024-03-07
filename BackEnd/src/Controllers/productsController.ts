import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";
import { Product } from "../Interfaces/productInterface";

export const createProduct = async (req: Request, res: Response) => {
  try {
    let id = v4();

    console.log(id);

    const {
      productname,
      category_id,
      quantity,
      description,
      price,
      image,
    }: Product = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);

    const validatedresult = (
      await pool
        .request()
        .input("productname", mssql.VarChar, productname)
        .execute("IfProductExists")
    ).recordset;

    console.log("Your result", validatedresult.length);

    if (validatedresult.length >= 1) {
      return res
        .status(201)
        .json({ messageerror: "This Product Name already Exist" });
    } else {
      const result = (
        await pool
          .request()
          .input("product_id", mssql.VarChar, id)
          .input("productname", mssql.VarChar, productname)
          .input("category_id", mssql.VarChar, category_id)
          .input("quantity", mssql.Int, quantity)
          .input("description", mssql.VarChar, description)
          .input("price", mssql.Decimal, price)
          .input("image", mssql.VarChar, image)
          .execute("createProduct")
      ).rowsAffected;

      console.log(result);
      return res.status(201).json({
        message: `${productname} was added succesfully.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};
//get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let products = (await Connection.execute("getAllProducts")).recordset;
    if (products) {
      return res.json({ products });
    } else {
      return res.status(200).json({
        messageerror: "No products",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(201)
      .json({ messageerror: "There was an issue retrieving products" });
  }
};

export const getProductsbyCategoryId = async (req: Request, res: Response) => {
  try {
    const category_id = req.params.category_id;

    let products = (
      await Connection.execute("getProductsbyCategoryId", {
        category_id: category_id,
      })
    ).recordset;

    if (products.length > 0) {
      return res.json({ products });
    } else {
      return res.status(404).json({
        messageerror: "No products found for the given category",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res.status(500).json({
      messageerror: "There was an issue retrieving products",
    });
  }
};

//geta product

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Product ID:", id);
    let product = (
      await Connection.execute("getOneProduct", { product_id: id })
    ).recordset;

    return res.json({ product });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(201)
      .json({ message: "There was an issue retrieving product" });
  }
};

//updateproduct

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const {
      productname,
      category_id,
      quantity,
      description,
      price,
      image,
    }: Product = req.body;
    console.log("ProductID:", id);
    let result = (
      await Connection.execute("updateproduct", {
        product_id: id,
        productname,
        category_id,
        quantity,
        description,
        price,
        image,
      })
    ).recordset;
    return res.json({ result, message: "Product updated successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(201)
      .json({ message: "There was an issue Productproduct" });
  }
};

//deleteProduct
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Product ID:", id);
    let product = (
      await Connection.execute("deleteProduct", { product_id: id })
    ).rowsAffected;

    return res.json({ message: "Product deleted Successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(201)
      .json({ message: "There was an issue deleting product" });
  }
};
