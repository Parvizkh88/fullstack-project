import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

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
const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(404).json({
        message: "token is missing",
      });
    }

    try {
      const decoded = jwt.verify(token, dev.app.jwtSecretKey) as DecodedToken;

      const { name, email, hashedPassword, phone } = decoded;
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
    } catch (err) {
      return res.status(401).json({
        message: "token is expired",
      });
    }
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
    // -----------------------------------------
    // token base authentication
    // generate JWT access token
    // we store the id in the token: {id:user._id}
    const token = jwt.sign({ id: user._id }, String(dev.app.jwtSecretKey), {
      expiresIn: "10m",
    });
    // console.log(token);

    // reset the cookie if there is a cookie with the same id
    if (req.cookies[`${user._id}`]) {
      req.cookies[`${user._id}`] = "";
    }

    // send the token in a response
    // name of the cookie: String(user._id)
    // token is the thing you want to store in the cookie:token
    // path name I want to use when I am creating the cookie
    res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 9 * 60),
      httpOnly: true, // send the jwt token inside http only cookie
      secure: false,
      sameSite: "none",
    });
    // -----------------------------------------
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
const userProfile = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "profile is returned ",
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

export { registerUser, verifyEmail, loginUser, logoutUser, userProfile };
