import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connectToDB();

    return NextResponse.json({
      status: true,
      message: "Review Updated Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      mmessage: error.message,
    });
  } finally {
    await disconnectToDB();
  }
}
