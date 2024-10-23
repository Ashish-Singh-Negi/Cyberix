import Laptop from "@/models/Laptop";
import { connectToDB } from "@/lib/connectToDB";
import { NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";

export async function GET() {
  try {
    await connectToDB();

    const result = await Laptop.find();

    return NextResponse.json(
      {
        success: true,
        message: "Product Found",
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Oops! No Product Found",
    });
  } finally {
    await disconnectToDB();
  }
}
