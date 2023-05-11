import { Request, RequestHandler, Response } from "express";

export const registerUser: RequestHandler = (req: Request, res: Response) => {
  try {
    console.log(req.fields);
    console.log(req.files);

    // const { name, email, password, phone }: UserType = req.body;
    res.status(201).json({
      message: "user is created",
    });
    //In your code, you're trying to access the message property
    // of error which is of type unknown. TypeScript is complaining
    // because it can't guarantee that the message property exists
    // on an unknown type.
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }
};
