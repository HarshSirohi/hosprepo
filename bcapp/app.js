import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";

import messageRouter from "./router/messagerouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
const app = express();
config({ path: "./.env" });


// Basic middleware for processing requests
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL, "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Standard parsers for cookies and form data
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Supporting file uploads (using temp files for better memory management)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


// API Route mapping
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Initialize database connection
dbConnection();

// Global error handler middleware (must be last)
app.use(errorMiddleware);

console.log("--- Backend App Configured Successfully ---");
export default app;