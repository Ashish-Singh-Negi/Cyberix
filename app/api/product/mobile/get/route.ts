import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Mobile from "@/models/Mobile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { productID } = await request.json();
    const result = await Mobile.findById(productID);
    console.log(result);

    return NextResponse.json(
      {
        message: "Product Found",
        success: true,
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Not Found",
    });
  } finally {
    await disconnectToDB();
  }
}
