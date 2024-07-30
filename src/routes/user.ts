import express from "express";
import jwt from "jsonwebtoken";
import { UserSignin, UserSignup } from "../validation";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.use(express.json());

// Get User Data by Auth Token
userRouter.get("/getUser", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({
      message: "Authorization Token not found!",
    });
  } else {
    const authToken = token.split(" ")[1];
    jwt.verify(
      authToken,
      process.env.JWT_SECRET || "Fallback",
      async (err: any, user: any) => {
        if (err) {
          return res.status(403).json({
            message: "Not Authorized!",
          });
        } else {
          const userData = await prisma.user.findFirst({
            where: {
              id: user.id,
            },
          });
          res.status(200).json({
            user: userData?.name,
          });
        }
      }
    );
  }
});

// Sign Up
userRouter.post("/signup", async (req, res) => {
  const userBody = req.body;
  const { success } = UserSignup.safeParse(userBody);
  if (!success) {
    res.status(422).json({
      message: "Invalid Input!",
    });
  } else {
    bcrypt.hash(userBody.password, 10, async (err, hash) => {
      if (err) {
        res.status(400).json({
          message: "Error Occurred while Signing Up!",
        });
      } else {
        try {
          const user = await prisma.user.create({
            data: {
              name: userBody.name,
              username: userBody.username,
              password: hash,
            },
          });

          const token = jwt.sign(
            {
              id: user.id,
            },
            process.env.JWT_SECRET || ""
          );

          res.status(200).json({
            token: token,
          });
        } catch (e) {
          res.status(400).json({
            message: "Error Occurred while Signing Up!",
          });
        }
      }
    });
  }
});

//Sign In
userRouter.post("/signin", async (req, res) => {
  const userBody = req.body;
  const { success } = UserSignin.safeParse(userBody);
  if (!success) {
    res.status(422).json({
      message: "Invalid Input!",
    });
  } else {
    const user = await prisma.user.findUnique({
      where: {
        username: userBody.username,
      },
    });

    if (!user) {
      res.status(403).json({
        message: "User not found!",
      });
    } else {
      bcrypt.compare(userBody.password, user.password, (err, result) => {
        if (err) {
          res.status(400).json({
            message: "Error occurred while Signing in!",
          });
        } else if (result) {
          const token = jwt.sign(
            {
              id: user.id,
            },
            process.env.JWT_SECRET || "Fallback"
          );

          res.status(200).json({
            token: token,
          });
        } else {
          res.status(403).json({
            message: "Incorrect Password!",
          });
        }
      });
    }
  }
});

export default userRouter;
