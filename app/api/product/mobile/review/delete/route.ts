import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Mobile from "@/models/Mobile";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    await connectToDB();

    const pid = request.nextUrl.searchParams.get("pid");
    const rid = request.nextUrl.searchParams.get("rid");

    const res = await Mobile.findByIdAndUpdate(pid, {
      $pull: {
        reviews: { _id: rid },
      },
    });

    console.log(res);

    return NextResponse.json({
      status: true,
      message: "Review Removed",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  } finally {
    await disconnectToDB();
  }
}
