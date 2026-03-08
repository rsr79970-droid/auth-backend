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

  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();

      res.json(users);
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
      const { oldPassword, newPassword } = req.body;

      const result = await userService.changePassword(
        req.user.id,
        oldPassword,
        newPassword,
      );

      res.json(result);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async changeRole(req, res) {
    try {
      const { role } = req.body;

      const user = await userService.changeRole(req.params.id, role);

      res.json(user);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new UserController();
