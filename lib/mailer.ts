import User from "@/models/User";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

type T = {
  email: string;
  emailType: string;
  userId: string;
  code?: number;
};

export const sendMail = async ({ email, emailType, userId, code }: T) => {
  try {
    //TODO: Configure mail for user

    const hashToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: code,
        forgotPasswordTokenExpiry: Date.now() + 300000,
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3b7322227c97e1",
        pass: "f20c2d5133f639",
      },
    });

    const mailOptions = {
      from: "cyberix.support@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email " : "Reset your Password",
      html: `<p>Click <a href=${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken} >here</a> to 
      ${
        emailType === "VERIFY"
          ? "Verify your email"
          : "Verification Code for Changing Password : "
      }
    ${code}</p>`, // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
