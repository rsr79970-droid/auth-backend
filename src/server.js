import helmet from "helmet";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import { authRoutes } from "./routes/auth.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000","https://auth-frontend-udaz.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/auth", authRoutes());
app.use("/users", userRoutes());

export default app;
