import User from "../models/user.model.js";

export const findAllUsers = async () => {
  return User.find().select("-password").populate("subscription");
};

export const findUserById = async (id) => {
  return User.findById(id).select("-password").populate("subscription");
};

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const updateUser = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true }).select("-password");
};

export const updatePassword = async (id, password) => {
  return User.findByIdAndUpdate(id, { password }, { new: true });
};

export const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};
