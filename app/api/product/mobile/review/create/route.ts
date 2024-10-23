import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Mobile from "@/models/Mobile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { pid, username, rating, heading, review } = await request.json();

    await Mobile.findByIdAndUpdate(
      pid,
      {
        $push: {
          reviews: {
            username,
            rating,
            heading,
            review,
            likes: [],
            dislikes: [],
            // likedBy: [],
            // dislikedBy: [],
          },
        },
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      {
        status: true,
        message: "Review Added",
      },
      {
        status: 201,
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
