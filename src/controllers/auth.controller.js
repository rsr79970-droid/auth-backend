import authService from "../services/auth.service.js";

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const { accessToken, refreshToken, user } = await authService.register({
        name,
        email,
        password,
      });

      const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      };

      res.cookie("access_token", accessToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000,
      });

      res.cookie("refresh_token", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async verify(req, res) {
    try {
      const { email, code } = req.body;

      const { accessToken, refreshToken, user } = await authService.verify({
        email,
        code,
      });

      const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      };

      res.cookie("access_token", accessToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000,
      });

      res.cookie("refresh_token", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ user });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken, user } = await authService.login({
        email,
        password,
      });

      const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      };

      res.cookie("access_token", accessToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000,
      });

      res.cookie("refresh_token", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ user });
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async refresh(req, res) {
    try {
      const token = req.cookies.refresh_token;

      const { accessToken } = await authService.refresh(token);

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
      });

      res.json({ message: "Token refreshed" });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: "Invalid refresh token",
      });
    }
  }

  async me(req, res) {
    try {
      const user = await authService.getMe(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  }

  async logout(req, res) {
    try {
      await authService.logout();

      res.clearCookie("access_token");
      res.clearCookie("refresh_token");

      res.json({
        message: "Logged out successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new AuthController();
