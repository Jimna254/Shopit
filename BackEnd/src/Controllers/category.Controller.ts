import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";
import { Category } from "../Interfaces/categoryInterface";

export const createCategory = async (req: Request, res: Response) => {
  try {
    let id = v4();

    console.log(id);

    const { categoryname, image }: Category = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);

    const validatedresult = (
      await pool
        .request()
        .input("categoryname", mssql.VarChar, categoryname)
        .execute("IfCategoryExists")
    ).recordset;

    console.log("Your result", validatedresult.length);

    if (validatedresult.length >= 1) {
      return res
        .status(201)
        .json({ messageerror: "This Category Name already Exist" });
    } else {
      const result = (
        await pool
          .request()
          .input("category_id", mssql.VarChar, id)
          .input("categoryname", mssql.VarChar, categoryname)
          .input("image", mssql.VarChar, image)
          .execute("createCategory")
      ).rowsAffected;

      console.log(result);
      return res.status(201).json({
        message: `${categoryname} was added succesfully.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};
//get all Categories
export const getallCategories = async (req: Request, res: Response) => {
  try {
    let categories = (await Connection.execute("getallCategories")).recordset;
    if (categories) {
      return res.json({ categories });
    } else {
      return res.status(200).json({
        messageerror: "No Categories",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(201)
      .json({ messageerror: "There was an issue retrieving Categories" });
  }
};

//get a Category

export const getOneCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Category ID:", id);
    let category = (
      await Connection.execute("getOneCategory", { category_id: id })
    ).recordset;

    return res.json({ category });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res.status(201).json({ message: "There was an issue retrieving C" });
  }
};

//updateCategory

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { categoryname, image }: Category = req.body;
    console.log("Category:", id);
    let result = await Connection.execute("updateCategory", {
      category_id: id,
      categoryname,
      image,
    });
    return res.json({ result, message: "Category updated successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res.status(201).json({ message: "There was an issue Category" });
  }
};

//deleteCategory
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Category ID:", id);
    let category = (
      await Connection.execute("deleteCategory", { category_id: id })
    ).rowsAffected;

    return res.json({ message: "Category deleted Successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(201)
      .json({ message: "There was an issue deleting Category" });
  }
};
