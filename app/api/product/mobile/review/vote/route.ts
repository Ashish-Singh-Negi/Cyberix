import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Mobile from "@/models/Mobile";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connectToDB();

    const { pid, rid, likes, dislikes, likeBy, dislikeBy } =
      await request.json();

    await Mobile.findOneAndUpdate(
      { _id: pid, "reviews._id": rid },
      {
        $set: {
          "reviews.$.likes": likes,
          "reviews.$.dislikes": dislikes,
          // "reviews.$.likedBy": likeBy,
          // "reviews.$.dislikedBy": dislikeBy,
        },
      }
    );

    return NextResponse.json({
      status: true,
      message: "Voted",
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
