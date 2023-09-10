"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateJWTforUser = exports.userSecretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.userSecretKey = "user";
const AuthenticateJWTforUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.userSecretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid" });
            }
            if (!user) {
                return res.status(403).json({ message: "Invalid" });
            }
            if (typeof user == "string") {
                return res.status(403).json({ message: "Invalid" });
            }
            req.headers["userId"] = user.id;
            next();
        });
    }
    else {
        return res.status(401).json({ message: "Invalid" });
    }
};
exports.AuthenticateJWTforUser = AuthenticateJWTforUser;
