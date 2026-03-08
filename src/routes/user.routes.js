import express from "express";
import userController from "../controllers/user.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

export const userRoutes = () => {
  const router = express.Router();

  router.get("/me", authMiddleware, userController.getMe);
  router.patch("/profile", authMiddleware, userController.updateProfile);
  router.patch("/password", authMiddleware, userController.changePassword);

  return router;
};
