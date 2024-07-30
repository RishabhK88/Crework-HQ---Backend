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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['authorization'];
        if (!token) {
            res.status(403).json({
                message: "Authorization Token not found!"
            });
        }
        else {
            const authToken = token.split(" ")[1];
            jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET || "Fallback", (err, user) => {
                if (err) {
                    return res.status(403).json({
                        message: "Not Authorized!"
                    });
                }
                else {
                    req.userId = user.id;
                    next();
                }
            });
        }
    });
}
exports.default = userMiddleware;
