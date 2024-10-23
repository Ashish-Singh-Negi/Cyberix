import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const { uid, pid, color, varient } = await request.json();

    await User.findByIdAndUpdate(uid, {
      $pull: {
        itemsInCart: {
          pid,
          color,
          varient,
        },
      },
    });

    return NextResponse.json({
      message: "Product Removed Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
