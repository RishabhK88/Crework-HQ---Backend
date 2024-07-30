import zod from "zod";

export const UserSignup = zod.object({
  name: zod.string(),
  username: zod.string().email(),
  password: zod.string().min(8).max(16),
});

export const UserSignin = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8).max(16),
});

export const Task = zod.object({
  title: zod.string(),
  description: zod.string().optional(),
  status: zod.enum(["ToDo", "InProgress", "UnderReview", "Completed"]),
  priority: zod.enum(["Low", "Medium", "Urgent"]).optional(),
  deadline: zod.string().datetime({ offset: true }).optional(),
});
