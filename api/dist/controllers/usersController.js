"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const jwt = require("jsonwebtoken");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptPassword_1 = require("../helpers/bcryptPassword");
const config_1 = __importDefault(require("../config"));
const email_1 = __importDefault(require("../helpers/email"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const isExist = yield userModel_1.default.findOne({ email: email });
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
        const hashedPassword = yield (0, bcryptPassword_1.securePassword)(password);
        // store the data
        const token = jwt.sign({ name, email, phone, hashedPassword }, config_1.default.app.jwtSecretKey, { expiresIn: "20m" });
        // prepare an email
        const emailData = {
            email,
            subject: "Account Activation Email",
            html: `
            <h2>Hello ${name}! </h2>
            <p>Please click here to <a href="${config_1.default.app.clientUrl}/api/users/activate?token=${token}" target="_blank">activate your account</a> </p>
            `,
        };
        (0, email_1.default)(emailData);
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "An unexpected error occurred.",
            });
        }
    }
});
exports.registerUser = registerUser;
