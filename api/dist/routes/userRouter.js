"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const auth_1 = require("../middlewares/auth");
const fileUpload_1 = require("../middlewares/fileUpload");
const userRouter = (0, express_1.Router)();
// userRouter.use(
//   session({
//     name: "user_session",
//     secret: dev.app.sessionSecretKey || "oi9hewgifwoyg_",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 10 * 6000 },
//   })
// );
// I would like to use multer instead of formidable to upload images:
// userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/register", fileUpload_1.upload.single("image"), usersController_1.registerUser);
userRouter.post("/verify-email", usersController_1.verifyEmail);
userRouter.post("/login", usersController_1.loginUser);
userRouter.post("/logout", usersController_1.logoutUser);
userRouter.get("/", auth_1.isLoggedIn, usersController_1.userProfile);
userRouter.post("/forget-password", usersController_1.forgetPassword);
userRouter.post("/reset-password", usersController_1.resetPassword);
exports.default = userRouter;
