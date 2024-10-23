import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";

import { TokenData } from "@/lib/definations";

export async function POST(request: NextRequest) {
  await connectToDB();

  try {
    const { email, password } = await request.json();

    // Search for user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "user not exist",
        success: false,
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({
        message: "Invalid Password",
        success: false,
      });
    }

    const tokenData: TokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "SignIn Successfully",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  } finally {
    disconnectToDB();
  }
}
