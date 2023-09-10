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
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const db_1 = require("../db");
router.post("/:id", auth_1.AuthenticateJWTforUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const isCourse = yield db_1.Course.findById(courseId);
    if (isCourse) {
        const userCheck = yield db_1.User.findById(req.headers["userId"]);
        if (userCheck) {
            const indexOfCourse = userCheck.purchasedCourses.findIndex(course => course._id == courseId);
            if (indexOfCourse == -1) {
                try {
                    const updatedUser = yield db_1.User.findByIdAndUpdate(req.headers["userId"], { $push: { purchasedCourses: isCourse } }, { new: true });
                    if (updatedUser) {
                        res.json({ message: "success", user: updatedUser });
                    }
                    else {
                        res.status(404).json({ message: "User not found" });
                    }
                }
                catch (error) {
                    console.error("Error updating user:", error);
                    res.status(500).json({ message: "Internal server error" });
                }
            }
            else {
                res.status(404).json({ message: "present" });
            }
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
}));
router.get("/", auth_1.AuthenticateJWTforUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCheck = yield db_1.User.findById(req.headers["userId"]);
        if (!userCheck) {
            return res.status(404).json({ message: 'User not found' });
        }
        const coursesId = userCheck.purchasedCourses;
        if (coursesId.length > 0) {
            const courses = yield Promise.all(coursesId.map((course) => __awaiter(void 0, void 0, void 0, function* () {
                const purchasedCourse = yield db_1.Course.findById(course._id);
                return purchasedCourse;
            })));
            return res.status(200).json({ courses: courses });
        }
        else {
            return res.status(200).json({ courses: [] });
        }
    }
    catch (error) {
        console.error("Error fetching purchased courses:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
