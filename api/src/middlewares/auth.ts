import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../@types/users";
import dev from "../config";

const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (req.cookies.token) {
      const decoded = jwt.verify(
        req.cookies.token,
        dev.app.jwtSecretKey
      ) as DecodedToken;

      if (!decoded) {
        res.status(400).json({ message: "invalid token" });
      }

      req.body.role = decoded.role;
      next();
    } else {
      res.status(400).json({ message: "token missing" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message, test: "sfsf" });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.cookie) {
      res.status(400).json({
        message: "please logout!",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export { isLoggedIn, isLoggedOut };
