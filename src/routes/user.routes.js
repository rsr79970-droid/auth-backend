import express from "express";

import userController from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { rolesMiddleware } from "../middleware/role.middleware.js";

export const userRoutes = () => {
  const router = express.Router();

  // profile
  router.get("/me", authMiddleware, userController.getMe);
  router.patch("/profile", authMiddleware, userController.updateProfile);
  router.patch("/password", authMiddleware, userController.changePassword);

  // admin
  router.get(
    "/",
    authMiddleware,
    rolesMiddleware(["ADMIN"]),
    userController.getUsers,
  );

  router.patch(
    "/:id/role",
    authMiddleware,
    rolesMiddleware(["ADMIN"]),
    userController.changeRole,
  );

  return router;
};
