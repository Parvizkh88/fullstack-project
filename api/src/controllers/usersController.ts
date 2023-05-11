import { Request, RequestHandler, Response } from "express";
import User from "../models/userModel";
import { UserType } from "../@types/users";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    if (!req.fields) {
      res.status(400).json({ message: "Missing request fields" });
      return;
    }
    const { name, email, password, phone }: UserType = req.fields;
    // const { image }: UserType = req.files;
    const newUser = new User({ name, email, password, phone });
    await newUser.save();
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
