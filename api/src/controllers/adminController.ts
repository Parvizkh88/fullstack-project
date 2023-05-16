import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/userModel";
import { UserType, DecodedToken } from "../@types/users";
import { securePassword, comparePassword } from "../helpers/bcryptPassword";
import dev from "../config";
import sendEmailWithNodeMailer from "../helpers/email";

const loginAdmin = async (req: Request, res: Response) => {
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
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(400).json({
        message: "user with this email does not exist. Please register first",
      });
    }
    // isAdmin - I want to check it before checking the password and comparing ...
    if (foundUser.is_admin === 0) {
      return res.status(400).json({
        message: "Not an admin",
      });
    }
    const isPasswordMatched = await comparePassword(
      password,
      foundUser.password
    );
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
    const token = jwt.sign(
      { id: foundUser._id },
      String(dev.app.jwtSecretKey),
      {
        expiresIn: "10m",
      }
    );
    // console.log(token);

    // reset the cookie if there is a cookie with the same id
    if (req.cookies[`${foundUser._id}`]) {
      req.cookies[`${foundUser._id}`] = "";
    }

    // send the token in a response
    // name of the cookie: String(user._id)
    // token is the thing you want to store in the cookie:token
    // path name I want to use when I am creating the cookie
    res.cookie(String(foundUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 9 * 60),
      httpOnly: true, // send the jwt token inside http only cookie
      secure: false,
      sameSite: "none",
    });
    // -----------------------------------------
    res.status(200).json({
      foundUser: {
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        image: foundUser.image,
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
const logoutAdmin = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      ok: true,
      message: "logout successful ",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        ok: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }
};

export { loginAdmin, logoutAdmin };
