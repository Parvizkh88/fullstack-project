import formidable from "express-formidable";
import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail,
} from "../controllers/usersController";
const router = Router();

router.post("/register", formidable(), registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
