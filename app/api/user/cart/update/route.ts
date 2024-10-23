import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    await connectToDB();

    const {} = await request.json();

    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  } finally {
    disconnectToDB();
  }
}
