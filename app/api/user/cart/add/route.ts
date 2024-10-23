import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { uid, pid, brandName, productName, color, varient, img } =
      await request.json();

    await User.findByIdAndUpdate(uid, {
      $push: {
        itemsInCart: {
          pid,
          color,
          brandName,
          productName,
          varient,
          quantity: 1,
          img,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product Added In Cart",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
