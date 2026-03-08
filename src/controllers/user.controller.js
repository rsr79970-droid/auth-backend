import userService from "../services/user.service.js";

class UserController {
  async getMe(req, res) {
    try {
      const user = await userService.getMe(req.user.id);

      res.json(user);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async updateProfile(req, res) {
    try {
      const user = await userService.updateProfile(req.user.id, req.body);

      res.json(user);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async changePassword(req, res) {
    try {
      const userId = req.user.id;

      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        throw new Error("Passwords are required");
      }

      const data = await userService.changePassword(
        userId,
        oldPassword,
        newPassword,
      );

      res.json(data);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new UserController();
