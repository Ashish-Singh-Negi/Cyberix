import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { id } = await request.json();

    const data = await User.findById(id);

    return NextResponse.json({
      success: true,
      message: "Successed",
      data: data.itemsInCart,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
