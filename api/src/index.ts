import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import csurf from "csurf";

import dev from "./config";
import connectDatabase from "./config/db";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";

// third party packages here

import cors from "cors";
import productRouter from "./routes/productRouter";

// import {connectDB} from './config/db';

const app: Application = express();

const CLIENT_ORIGIN = "http://localhost:3000";

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);


app.use(morgan("dev"));
app.use(cookieParser());
// app.use(csurf({ cookie: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
 res.header("Access-Control-Allow-Credentials", "true");
 res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
 res.header(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Cookie"
 );
 next();
});
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin/products", productRouter);

const PORT = dev.app.serverPort;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("api is running fine");
});

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({ message: err.message });
// });

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDatabase();
});
