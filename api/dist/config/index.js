"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.SERVER_PORT);
const dev = {
    app: {
        serverPort: process.env.SERVER_PORT || 3001,
        jwtSecretKey: process.env.JWT_SECRET_KEY || "hheetyssgdu!h",
    },
    db: {
        url: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ecommerce2023",
    },
};
exports.default = dev;
