import User from "@/models/User";

import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import { getDataFromToken } from "@/lib/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const userId = await getDataFromToken(request);

    const { name, phoneNumber, pincode, locality, address } =
      await request.json();

    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        address: {
          name,
          phoneNumber,
          pincode,
          locality,
          address,
        },
      },
    });

    return NextResponse.json(
      {
        message: "User Found",
        success: true,
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  } finally {
    disconnectToDB();
  }
}
