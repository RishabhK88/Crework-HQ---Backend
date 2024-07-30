"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.UserSignin = exports.UserSignup = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserSignup = zod_1.default.object({
    name: zod_1.default.string(),
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(8).max(16),
});
exports.UserSignin = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(8).max(16),
});
exports.Task = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    status: zod_1.default.enum(["ToDo", "InProgress", "UnderReview", "Completed"]),
    priority: zod_1.default.enum(["Low", "Medium", "Urgent"]).optional(),
    deadline: zod_1.default.string().datetime({ precision: 3 }).optional(),
});
