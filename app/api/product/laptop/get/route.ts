import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Laptop from "@/models/Laptop";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { productID } = await request.json();
    const data = await Laptop.findById(productID);

    return NextResponse.json(
      {
        message: "Product Found",
        success: true,
        data: data,
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
    await disconnectToDB();
  }
}
