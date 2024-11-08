import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Mobile from "@/models/Mobile";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  await connectToDB();
  try {
    const { pid, rating } = await request.json();

    if (!pid || !rating)
      return NextResponse.json(
        {
          success: false,
          message: `Few info is missing`,
        },
        {
          status: 400,
        }
      );

    await Mobile.findByIdAndUpdate(pid, {
      $set: {
        rating: rating,
      },
    });

    return NextResponse.json({
      status: true,
      message: "Review Added Successfully",
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
