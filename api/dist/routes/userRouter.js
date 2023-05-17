"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_formidable_1 = __importDefault(require("express-formidable"));
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const auth_1 = require("../middlewares/auth");
// import upload from "../middlewares/fileUpload";
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
userRouter.post("/register", (0, express_formidable_1.default)(), usersController_1.registerUser);
userRouter.post("/verify-email", usersController_1.verifyEmail);
userRouter.post("/login", usersController_1.loginUser);
userRouter.get("/logout", usersController_1.logoutUser);
userRouter.get("/", auth_1.isLoggedIn, usersController_1.userProfile);
userRouter.post("/forget-password", usersController_1.forgetPassword);
userRouter.post("/reset-password", usersController_1.resetPassword);
exports.default = userRouter;
