import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import dev from "./config";
import connectDatabase from "./config/db";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";

// third party packages here

import cors from 'cors'  ;

// import {connectDB} from './config/db';

const app: Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

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
