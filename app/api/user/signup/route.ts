import bcrypt from "bcryptjs";

import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";
import { sendMail } from "@/lib/mailer";
import User from "@/models/User";

type T = {
  username: string;
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { username, email, password }: T = await request.json();

    const hashedPass = await bcrypt.hash(password, 10);

    const exist = await User.findOne({ email });

    if (exist) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    }

    const user = await User.create({
      username,
      email,
      password: hashedPass,
    });

    // send Verification Email
    await sendMail({ email, emailType: "VERIFY", userId: user._id });

    return NextResponse.json(
      {
        success: true,
        message: "User Registerd Sucessfully",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "error occur in registering user",
        errmessage: error.message,
      },
      {
        status: 500,
      }
    );
  } finally {
    disconnectToDB();
  }
}
