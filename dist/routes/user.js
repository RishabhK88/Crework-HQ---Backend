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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("../validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const userRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
userRouter.use(express_1.default.json());
// Get User Data by Auth Token
userRouter.get("/getUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(403).json({
            message: "Authorization Token not found!",
        });
    }
    else {
        const authToken = token.split(" ")[1];
        jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET || "Fallback", (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({
                    message: "Not Authorized!",
                });
            }
            else {
                const userData = yield prisma.user.findFirst({
                    where: {
                        id: user.id,
                    },
                });
                res.status(200).json({
                    user: userData === null || userData === void 0 ? void 0 : userData.name,
                });
            }
        }));
    }
}));
// Sign Up
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    const { success } = validation_1.UserSignup.safeParse(userBody);
    if (!success) {
        res.status(422).json({
            message: "Invalid Input!",
        });
    }
    else {
        bcrypt_1.default.hash(userBody.password, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(400).json({
                    message: "Error Occurred while Signing Up!",
                });
            }
            else {
                try {
                    const user = yield prisma.user.create({
                        data: {
                            name: userBody.name,
                            username: userBody.username,
                            password: hash,
                        },
                    });
                    const token = jsonwebtoken_1.default.sign({
                        id: user.id,
                    }, process.env.JWT_SECRET || "");
                    res.status(200).json({
                        token: token,
                    });
                }
                catch (e) {
                    res.status(400).json({
                        message: "Error Occurred while Signing Up!",
                    });
                }
            }
        }));
    }
}));
//Sign In
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    const { success } = validation_1.UserSignin.safeParse(userBody);
    if (!success) {
        res.status(422).json({
            message: "Invalid Input!",
        });
    }
    else {
        const user = yield prisma.user.findUnique({
            where: {
                username: userBody.username,
            },
        });
        if (!user) {
            res.status(403).json({
                message: "User not found!",
            });
        }
        else {
            bcrypt_1.default.compare(userBody.password, user.password, (err, result) => {
                if (err) {
                    res.status(400).json({
                        message: "Error occurred while Signing in!",
                    });
                }
                else if (result) {
                    const token = jsonwebtoken_1.default.sign({
                        id: user.id,
                    }, process.env.JWT_SECRET || "Fallback");
                    res.status(200).json({
                        token: token,
                    });
                }
                else {
                    res.status(403).json({
                        message: "Incorrect Password!",
                    });
                }
            });
        }
    }
}));
exports.default = userRouter;
