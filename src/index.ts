import express from "express";
import userRouter from "./routes/user";
import taskRouter from "./routes/tasks";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.use("/keepAlive", (req: any, res: any)=>{
  res.status(200).json({
    message: "success"
  })
})

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
