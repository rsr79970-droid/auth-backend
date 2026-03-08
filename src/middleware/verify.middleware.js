export const verifyMiddleware = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      message: "Email not verified",
    });
  }

  next();
};
