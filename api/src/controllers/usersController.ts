import { Request, RequestHandler, Response } from "express";
const jwt = require("jsonwebtoken");

import User from "../models/userModel";
import { UserType } from "../@types/users";
import { securePassword } from "../helpers/bcryptPassword";
import dev from "../config";
import sendEmailWithNodeMailer from "../helpers/email";

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

    const { name, email, password, phone } = req.fields;

    // Check that required properties exist
    if (!name || !email || !password || !phone) {
      res
        .status(404)
        .json({ message: "name, email, phone or password is missing " });
      return;
    }

    if (password.length < 6) {
      return res.status(404).json({
        message: "minimum length for password is 6",
      });
    }

    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res.status(400).json({
        message: "user with this email already exists",
      });
    }

    const hashedPassword = await securePassword(password);

    // store the data
    const token = jwt.sign(
      { name, email, phone, hashedPassword },
      dev.app.jwtSecretKey,
      { expiresIn: "20m" }
    );

    // prepare an email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
            <h2>Hello ${name}! </h2>
            <p>Please click here to <a href="${dev.app.clientUrl}/api/users/activate?token=${token}" target="_blank">activate your account</a> </p>
            `,
    };
    sendEmailWithNodeMailer(emailData);
    // const { image }: UserType = req.files;
    // const newUser = new User({ name, email, password, phone });
    // await newUser.save();
    res.status(200).json({
      message: "verification link has been sent to your email.",
      token: token,
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