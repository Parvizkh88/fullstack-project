import formidable from "express-formidable";
import { Router } from "express";
import { registerUser } from "../controllers/usersController";
const router = Router();

router.post("/register", formidable(), registerUser);

export default router;
