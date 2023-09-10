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
const db_1 = require("../db"); // Assuming these are separate modules
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const zod_1 = require("zod");
const router = express_1.default.Router();
const userInput = zod_1.z.object({
    email: zod_1.z.string().min(10).max(40).email(),
    password: zod_1.z.string().min(5).max(40)
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = userInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(404).json({ message: parsedInput.error.message });
    }
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    const user = yield db_1.User.findOne({ email });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new db_1.User({ email, password });
        newUser.save();
        let userToken = jsonwebtoken_1.default.sign({ id: newUser._id }, auth_1.userSecretKey, { expiresIn: '1h' });
        return res.status(201).json({ message: "success", token: userToken });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = userInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(404).json({ message: parsedInput.error.message });
    }
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    const user = yield db_1.User.findOne({ email, password });
    if (user) {
        let userToken = jsonwebtoken_1.default.sign({ id: user._id }, auth_1.userSecretKey, { expiresIn: '1h' });
        res.status(200).json({ message: "success", token: userToken, email: email });
    }
    else {
        res.status(404).json({ message: "failed" });
    }
}));
router.get("/me", auth_1.AuthenticateJWTforUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield db_1.User.findOne({ _id: userId });
    if (!user) {
        res.status(403).json({ msg: "User doesn't exist" });
        return;
    }
    res.json({
        message: "success",
        email: user.email,
    });
}));
exports.default = router;
