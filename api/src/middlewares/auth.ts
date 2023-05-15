import { Request, Response, NextFunction } from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  try {
    console.log(req.headers.cookie);
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({ message: error.message });
    } else {
      res.send({ message: "An unknown error occurred" });
    }
  }
};

export { isLoggedIn };
