import { Router } from "express";
import dev from "../config";
import { loginAdmin, logoutAdmin } from "../controllers/adminController";
import { isLoggedIn, isLoggedOut } from "../middlewares/auth";
const adminRouter = Router();

// adminRouter
//   .use
// session({
//   name: "admin_session",
//   secret: dev.app.sessionSecretKey || "oi9hewgifwoyg_",
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false, maxAge: 10 * 6000 },
// })
// ();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/logout", logoutAdmin);

export default adminRouter;
