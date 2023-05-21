import multer, { StorageEngine } from "multer";
import path from "path";
import { NextFunction, Request, Response } from "express";

const FILE_SIZE = 1024 * 1024 * 2;

const storage: StorageEngine = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, path.join(__dirname, "../public/images/users"));
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: FILE_SIZE },
});

const fileUpload = (req: Request, res: Response, next: NextFunction): void => {
  try {
    upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        next(err);
      } else if (err) {
        next(err);
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

export default fileUpload;
//--------------------
// import multer, { StorageEngine } from "multer";
// import path from "path";
// import { NextFunction, Request, Response } from "express";

// const FILE_SIZE = 1024 * 1024 * 2;

// const storage: StorageEngine = multer.diskStorage({
//   destination: function (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, destination: string) => void
//   ) {
//     cb(null, path.join(__dirname, "../public/images/users"));
//   },
//   filename: function (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, filename: string) => void
//   ) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const fileUpload = (req: Request, res: Response, next: NextFunction): void => {
//   try {
//     const upload = multer({
//       storage: storage,
//       limits: { fileSize: FILE_SIZE },
//     });
//   } catch (error) {}
// };

// export default fileUpload;
