import userModel from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/generateTokens.js";

import { generateCode } from "../utils/generateCode.js";
import { sendVerifyEmail } from "../utils/mailer.js";

class AuthService {
  async register(data) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error("Name, email and password required");
    }

    const exist = await userModel.findOne({ email });

    if (exist) {
      throw new Error("User already exists");
    }

    const hashed = await hashPassword(password);

    const code = generateCode();

    const user = await userModel.create({
      name,
      email,
      password: hashed,
      verifyCode: code,
      verifyCodeExpires: Date.now() + 10 * 60 * 1000,
    });

    await sendVerifyEmail(email, code);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async verify(data) {
    const { email, code } = data;

    const user = await userModel.findOne({ email });

    if (!user) throw new Error("User not found");

    if (user.verifyCode !== code) throw new Error("Invalid code");

    if (user.verifyCodeExpires < Date.now()) throw new Error("Code expired");

    user.isVerified = true;
    user.verifyCode = null;
    user.verifyCodeExpires = null;

    await user.save();

    return { message: "Email verified successfully" };
  }

  async login(data) {
    const { email, password } = data;

    const user = await userModel.findOne({ email });

    if (!user) throw new Error("User not found");

    if (!user.isVerified) {
      throw new Error("Email not verified");
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) throw new Error("Invalid password");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw new Error("No refresh token");

    const decoded = verifyRefreshToken(refreshToken);

    const user = await userModel.findById(decoded.id);

    if (!user) throw new Error("User not found");

    const accessToken = generateAccessToken(user);

    return { accessToken };
  }

  async getMe(userId) {
    const user = await userModel.findById(userId).select("-password");

    if (!user) throw new Error("User not found");

    return user;
  }

  async logout() {
    return {
      message: "Logged out successfully",
    };
  }
}

export default new AuthService();
