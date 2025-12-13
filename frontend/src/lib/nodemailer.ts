"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const sendEmail = async (message: {
  from: string;
  subject: string;
  text: string;
}) => {
  // gmail rewrites the from header https://nodemailer.com/usage/using-gmail#2-gmail-quirks-to-keep-in-mind
  await transporter.sendMail({
    to: process.env.GOOGLE_EMAIL,
    subject: message.subject,
    text: `
    from : ${message.from}
    message: ${message.text}
    `,
  });
};

export default sendEmail;
