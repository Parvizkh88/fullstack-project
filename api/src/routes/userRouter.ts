import formidable from "express-formidable";
import { Router } from "express";
import { registerUser, verifyEmail } from "../controllers/usersController";
const router = Router();

router.post("/register", formidable(), registerUser);
router.post("/verify-email", verifyEmail);

export default router;
