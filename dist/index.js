"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/user", user_1.default);
app.use("/task", tasks_1.default);
app.use("/keepAlive", (req, res) => {
    res.status(200).json({
        message: "success"
    });
});
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
