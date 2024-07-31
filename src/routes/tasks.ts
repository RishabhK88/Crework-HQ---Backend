import express from "express";
import userMiddleware from "../middleware/user";
import { PrismaClient } from "@prisma/client";
import { Task } from "../validation";

const taskRouter = express.Router();
const prisma = new PrismaClient();

taskRouter.use(express.json());
taskRouter.use(userMiddleware);

// Get All Users' Tasks
taskRouter.get("/", async (req: any, res: any) => {
  const userId = req.userId;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({
      message: "Could not retriever user tasks!",
    });
  }
});

// Get Task by ID
taskRouter.get("/:taskId", async (req: any, res: any) => {
  const taskId = req.params.taskId;
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({
      message: "Could not retriever the task!",
    });
  }
});

// Add a New Task
taskRouter.post("/", async (req: any, res) => {
  const userId = req.userId;
  const taskBody = req.body;
  const { success } = Task.safeParse(taskBody);
  if (!success) {
    res.status(422).json({
      message: "Invalid Input!",
    });
  } else {
    try {
      const task = await prisma.task.create({
        data: {
          title: taskBody.title,
          description: taskBody.description,
          status: taskBody.status,
          priority: taskBody.priority,
          deadline: taskBody.deadline,
          userId: userId,
        },
      });
      res.status(200).json({
        message: `Task: ${task.title} created successfully!`,
      });
    } catch (e) {
      res.status(400).json({
        message: "Error while creating task!",
      });
    }
  }
});

// Update a Task by ID
taskRouter.put("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const taskBody = req.body;
  const { success } = Task.safeParse(taskBody);
  if (!success) {
    res.status(422).json({
      message: "Invalid Input!",
    });
  } else {
    try {
      const task = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          title: taskBody.title,
          description: taskBody.description,
          status: taskBody.status,
          priority: taskBody.priority,
          deadline: taskBody.deadline,
        },
      });
      res.status(200).json({
        message: `Task: ${task.title} updated successfully!`,
      });
    } catch (e) {
      res.status(400).json({
        message: "Error while updating task!",
      });
    }
  }
});

// Update Task Priority by ID
taskRouter.put("/updateStatus/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const taskBody = req.body;
  try {
    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: taskBody.status,
      },
    });
    res.status(200).json({
      message: `Task: ${task.title} priority updated successfully!`,
    });
  } catch (e) {
    res.status(400).json({
      message: "Error while updating task!",
    });
  }
});

// Delete Task by ID
taskRouter.delete("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    res.status(200).json({
      message: `Task: ${task.title} deleted successfully!`,
    });
  } catch (e) {
    res.status(400).json({
      message: "Could not delete the task!",
    });
  }
});

export default taskRouter;
