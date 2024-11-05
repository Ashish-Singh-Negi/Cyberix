import bcrypt from "bcryptjs";

import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";
import { sendMail } from "@/lib/mailer";
import User from "@/models/User";


export async function POST(request: NextRequest) {
  await connectToDB();

  try {
    const { username, email, password }= await request.json();

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
      address: null,
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
        status: 400,
      }
    );
  } finally {
    disconnectToDB();
  }
}
