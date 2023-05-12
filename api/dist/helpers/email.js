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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
sendEmailWithNodeMailer = (emailData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: config_1.default.app.smtpUsername,
                pass: config_1.default.app.smtpPassword, // generated ethereal password
            },
        });
        const mailOptions = {
            from: config_1.default.app.smtpUsername,
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.html, // html body
        };
        // send mail with defined transport object
        yield transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("-----SMTP ERROR1--------");
                console.log(error);
            }
            else {
                console.log("Message sent: %s", info.response);
            }
        });
    }
    catch (error) {
        console.log("-----SMTP ERROR2--------");
        console.log("Problem sending Email: ", error);
    }
});
exports.default = sendEmailWithNodeMailer;
