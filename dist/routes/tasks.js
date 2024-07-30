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
const user_1 = __importDefault(require("../middleware/user"));
const client_1 = require("@prisma/client");
const validation_1 = require("../validation");
const taskRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
taskRouter.use(express_1.default.json());
taskRouter.use(user_1.default);
// Get All Users' Tasks
taskRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const tasks = yield prisma.task.findMany({
            where: {
                userId: userId
            }
        });
        res.status(200).json(tasks);
    }
    catch (e) {
        res.status(400).json({
            message: "Could not retriever user tasks!"
        });
    }
}));
// Get Task by ID
taskRouter.get("/:taskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    try {
        const task = yield prisma.task.findFirst({
            where: {
                id: taskId,
            }
        });
        res.status(200).json(task);
    }
    catch (e) {
        res.status(400).json({
            message: "Could not retriever the task!"
        });
    }
}));
// Add a New Task
taskRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const taskBody = req.body;
    const { success } = validation_1.Task.safeParse(taskBody);
    if (!success) {
        res.status(422).json({
            message: "Invalid Input!"
        });
    }
    else {
        try {
            const task = yield prisma.task.create({
                data: {
                    title: taskBody.title,
                    description: taskBody.description,
                    status: taskBody.status,
                    priority: taskBody.priority,
                    deadline: taskBody.deadline,
                    userId: userId
                }
            });
            res.status(200).json({
                message: `Task: ${task.title} created successfully!`
            });
        }
        catch (e) {
            res.status(400).json({
                message: "Error while creating task!"
            });
        }
    }
}));
// Update a Task by ID
taskRouter.put("/:taskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    const taskBody = req.body;
    const { success } = validation_1.Task.safeParse(taskBody);
    if (!success) {
        res.status(422).json({
            message: "Invalid Input!"
        });
    }
    else {
        try {
            const task = yield prisma.task.update({
                where: {
                    id: taskId
                },
                data: {
                    title: taskBody.title,
                    description: taskBody.description,
                    status: taskBody.status,
                    priority: taskBody.priority,
                    deadline: taskBody.deadline,
                }
            });
            res.status(200).json({
                message: `Task: ${task.title} updated successfully!`
            });
        }
        catch (e) {
            res.status(400).json({
                message: "Error while updating task!"
            });
        }
    }
}));
// Update Task Priority by ID
taskRouter.put("/updatePriority/:taskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    const taskBody = req.body;
    try {
        const task = yield prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                status: taskBody.status,
            }
        });
        res.status(200).json({
            message: `Task: ${task.title} priority updated successfully!`
        });
    }
    catch (e) {
        res.status(400).json({
            message: "Error while updating task!"
        });
    }
}));
// Delete Task by ID
taskRouter.delete("/:taskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    try {
        const task = yield prisma.task.delete({
            where: {
                id: taskId,
            }
        });
        res.status(200).json({
            message: `Task: ${task.title} deleted successfully!`
        });
    }
    catch (e) {
        res.status(400).json({
            message: "Could not delete the task!"
        });
    }
}));
exports.default = taskRouter;
