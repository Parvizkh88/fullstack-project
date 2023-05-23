import { Request, RequestHandler, Response } from "express";
import { errorResponse } from "../helpers/responseHandler";
import Product from "../models/ProductModel";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, price, description, stock, role } = req.body;
    if (role!=1) {
         res.status(403).json({
           message: "forbidden",
         });
    }
    if (!title || !price || !description || !stock) {
      errorResponse(res, 400, "fill required feilds");
    }

    // -----------------------------------------
    const newProduct = new Product({
      title,
      price,
      description,
      stock,
    });
    const result = await newProduct.save();
    if (!result) {
      res.status(400).json({
        message: "Product was not created.",
      });
    }
    res.status(201).json({
      product: newProduct,
      message: "Product was created.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }
};
const editProduct = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      ok: true,
      message: "logout successful ",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        ok: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
      const role= req.body.role;
      if (role != 1) {
        res.status(403).json({
          message: "forbidden",
        });
      }
    const products = await Product.find({ is_admin: 0 });
    res.status(200).json({
      ok: true,
      message: "returned all users",
      products: products,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        ok: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }
};

export { createProduct, editProduct, getAllProduct };
