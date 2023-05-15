import { Request, Response, NextFunction } from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (req.headers.cookie) {
      // console.log(req.headers.cookie);
      next();
    } else {
      res.status(400).json({ message: "please login" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
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
