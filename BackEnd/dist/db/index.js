"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    purchasedCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }],
    cart: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }]
});
const courseSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    published: Boolean,
    adminId: String,
    name: String,
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Course = mongoose_1.default.model('Course', courseSchema);
