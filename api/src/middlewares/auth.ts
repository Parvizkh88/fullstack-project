// import jwt, { VerifyErrors } from "jsonwebtoken";
// import dev from "../config";

// // interface JwtPayload {
// //   id: string;
// // }
// // interface RequestWithUserId extends Request {
// //   id?: JwtPayload["id"];
// // }

// const isLoggedIn = (
//   req: RequestWithUserId,
//   res: Response,
//   next: NextFunction
// ): void => {
//   try {
//         // cookie here
//     if (!req.headers.cookie) {
//       res.status(404).send({
//         message: "No cookie found",
//       });
//       return;
//     }
//     // token inside the cookie - extract the token
//     const token = req.headers.cookie.split("=")[1];
//     console.log(token);
//     // verify token
//     if (!token) {
//       res.status(404).send({
//         message: "No token found",
//       });
//       return;
//     }

//     jwt.verify(
//       // this is the key to create and verify the token
//       String(dev.app.jwtSecretKey),
//       // we also pass the token
//       token,
//       //The err parameter is an error object that will
//       // be populated if the verification process fails,
//       //and the user parameter is the decoded token payload.
//       //If the verification process is successful,
//       //the code sets the req.id property to the decoded user.id
//       //value.This allows the user id to be accessed in subsequent
//       // middleware or route handlers.
//       async (err: VerifyErrors | null, user: JwtPayload | null) => {
//         if (err || !user) {
//           res.status(403).send({
//             message: "invalid token",
//           });
//           return;
//         }
//         // inside the request we are setting an id which
//         // is the decoded id (here I named it user id and I can name it whatever)
//         req.id = user.id; // setting this id. so, in any controllerI have and id
//         // of req.id that you can fetch the user from database
//         next();
//       }
//     );
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.send({ message: error.message });
//     } else {
//       res.send({ message: "An unknown error occurred" });
//     }
//   }
// };
// export { isLoggedIn };
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
