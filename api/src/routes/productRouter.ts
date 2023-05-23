import { Router } from "express";
import { createProduct, getAllProduct } from "../controllers/productController";
import { isLoggedIn } from "../middlewares/auth";
const productRouter = Router();

productRouter.get("/",isLoggedIn, getAllProduct );
productRouter.post("/",isLoggedIn, createProduct);
export default productRouter;
