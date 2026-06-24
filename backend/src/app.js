import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import hostelRouter from "./routes/hostel.routes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/hostels",hostelRouter);
app.use(errorHandler);

export default app;