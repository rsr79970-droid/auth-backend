export const validateRegister = ({ email, password }) => {

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

};

export const validateLogin = ({ email, password }) => {

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

};