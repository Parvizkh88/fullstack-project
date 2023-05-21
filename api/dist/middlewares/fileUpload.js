"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const FILE_SIZE = 1024 * 1024 * 2;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../public/images/users"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: FILE_SIZE },
});
const fileUpload = (req, res, next) => {
    try {
        exports.upload.single("image")(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                next(err);
            }
            else if (err) {
                next(err);
            }
            else {
                next();
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = fileUpload;
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
