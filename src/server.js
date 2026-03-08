import helmet from "helmet";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);
import { authRoutes } from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js";
import { userRoutes } from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.set("etag", false);

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes());
app.use("/users", userRoutes());

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
