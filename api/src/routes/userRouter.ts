import formidable from "express-formidable";
import session from "express-session";
import { Router } from "express";

import {
  forgetPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  userProfile,
  verifyEmail,
} from "../controllers/usersController";
import dev from "../config";
import { isLoggedIn, isLoggedOut } from "../middlewares/auth";
const userRouter = Router();

// userRouter.use(
//   session({
//     name: "user_session",
//     secret: dev.app.sessionSecretKey || "oi9hewgifwoyg_",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 10 * 6000 },
//   })
// );

userRouter.post("/register", formidable(), registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/", isLoggedIn, userProfile);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
