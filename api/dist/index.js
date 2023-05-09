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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./config/db"));
// third party packages here
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import {connectDB} from './config/db';
const app = (0, express_1.default)();
// app.use(cors());
app.use((0, morgan_1.default)("dev"));
// app.use(bodyParser.json());
const PORT = config_1.default.app.serverPort;
app.get("/", (req, res) => {
    res.status(200).send("api is running fine");
});
// app.use((err:Error, req:Request, res:Response,next:NextFunction)=>{
//   res.status(500).json({message:err.message});
// })
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`server is running at http://localhost:${PORT}`);
    yield (0, db_1.default)();
}));
