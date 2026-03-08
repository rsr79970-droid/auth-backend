import nodemailer from "nodemailer";

export const sendVerifyEmail = async (email, code) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verification code",
    html: `
      <h2>Your verification code</h2>
      <h1>${code}</h1>
      <p>This code expires in 10 minutes</p>
    `
  });

};