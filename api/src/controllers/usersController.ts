import { Request, RequestHandler, Response } from "express";
const jwt = require("jsonwebtoken");

import User from "../models/userModel";
import { UserType, DecodedToken } from "../@types/users";
import { securePassword, comparePassword } from "../helpers/bcryptPassword";
import dev from "../config";
import sendEmailWithNodeMailer from "../helpers/email";

const registerUser: RequestHandler = async (req: Request, res: Response) => {
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

    //  req.fields object is allowing its values to be either string
    // or string[] (an array of strings). so, I want to make sure
    // that name, email, password, and phone are indeed strings when
    // I destructure them from req.fields. You can do this by checking
    // their types before calling securePassword and sendEmailWithNodeMailer.
    if (typeof password !== "string" || typeof email !== "string") {
      return res.status(400).json({
        message: "Invalid email or password format",
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
const verifyEmail = (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    console.log(token);

    if (!token) {
      return res.status(404).json({
        message: "token is missing",
      });
    }

    jwt.verify(
      token,
      dev.app.jwtSecretKey,
      async function (err: Error | null, decoded: DecodedToken | undefined) {
        if (err) {
          return res.status(401).json({
            message: "token is expired",
          });
        }
        // decoded the data - bring the data if token is not expired
        if (decoded) {
          const { name, email, hashedPassword, phone } = decoded;
          console.log(decoded);
          const isExist = await User.findOne({ email: email });
          if (isExist) {
            return res.status(400).json({
              message: "user with this email already exists",
            });
          }
          // create the user without image
          const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            is_verified: 1,
          });
          // create the user with image (needed to be done)
          // save the user
          const user = await newUser.save();
          if (!user) {
            res.status(400).json({
              message: "user was not created.",
            });
          }
          res.status(201).json({
            message: "user was created. ready to login",
          });
        }
      }
    );
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
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "email or password is missing ",
      });
    }
    if (password.length < 6) {
      return res.status(404).json({
        message: "minimum length for password is 6",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "user with this email does not exist. Please register first",
      });
    }
    const isPasswordMatched = await comparePassword(password, user.password);
    // console.log(user.password);
    // console.log(password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "email/password mismatched",
      });
    }
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
      },
      message: "login successful",
    });
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
const logoutUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "logout successful ",
    });
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

export { registerUser, verifyEmail, loginUser, logoutUser };
