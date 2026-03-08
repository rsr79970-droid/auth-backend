import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import { rateLimitMiddleware } from "../middleware/rateLimit.middleware.js";
import { rolesMiddleware } from "../middleware/role.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const authRoutes = () => {
  const router = Router();

  router.post("/register", rateLimitMiddleware, (req, res) =>
    authController.register(req, res),
  );
  router.post("/verify", (req, res) => authController.verify(req, res));
  router.post("/login", rateLimitMiddleware, (req, res) =>
    authController.login(req, res),
  );
  router.post("/logout", (req, res) => authController.logout(req, res));
  router.post("/refresh", (req, res) => authController.refresh(req, res));
  router.get("/me", authMiddleware, (req, res) => authController.me(req, res));
  router.get("/admin", authMiddleware, rolesMiddleware(["ADMIN"]), (req, res) =>
    res.json({ message: "Admin access" }),
  );

  return router;
};
