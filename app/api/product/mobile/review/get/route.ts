import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Mobile from "@/models/Mobile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const pid = request.nextUrl.searchParams.get("pid");

    console.log(pid);

    const resData = await Mobile.findById(pid).select("reviews");

    return NextResponse.json(
      {
        status: true,
        message: "Review Added Successfully",
        data: resData,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  } finally {
    await disconnectToDB();
  }
}
