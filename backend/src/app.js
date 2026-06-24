import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/v1/users", userRouter);

export default app;