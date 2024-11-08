import User from "@/models/User";

import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import { getDataFromToken } from "@/lib/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    
    const userId = await getDataFromToken(request);

    const user = await User.findById(userId).select([
      "_id",
      "username",
      "email",
      "itemsInCart",
      "address",
    ]);

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
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 400,
      }
    );
  } finally {
    await disconnectToDB();
  }
}
