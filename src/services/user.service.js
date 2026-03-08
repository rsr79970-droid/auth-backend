import User from "../models/user.model.js";
import bcrypt from "bcrypt";

class UserService {

  async getMe(userId) {
    const user = await User.findById(userId).select("-password");

    return user;
  }

  async updateProfile(userId, data) {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name: data.name,
        bio: data.bio,
        location: data.location,
        website: data.website,
      },
      { new: true }
    ).select("-password");

    return user;
  }

  async changePassword(userId, oldPassword, newPassword) {

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const valid = await bcrypt.compare(oldPassword, user.password);

    if (!valid) {
      throw new Error("Old password is incorrect");
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;

    await user.save();

    return {
      message: "Password updated successfully",
    };
  }

}

export default new UserService();