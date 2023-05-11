"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_formidable_1 = __importDefault(require("express-formidable"));
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const router = (0, express_1.Router)();
router.post("/register", (0, express_formidable_1.default)(), usersController_1.registerUser);
exports.default = router;
