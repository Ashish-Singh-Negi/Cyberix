import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Mobile from "@/models/Mobile";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    console.log("Connecting to DB .....");
    await connectToDB();
    console.log("Connected to DB :::::");

    const { pid, rating } = await request.json();

    await Mobile.findByIdAndUpdate(pid, {
      $set: {
        rating: rating,
      },
    });

    return NextResponse.json({
      status: true,
      message: "Rating Changed",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: error.message,
    });
  } finally {
    console.log("Disconnecting from the database...");
    await disconnectToDB();
    console.log("Disconnected from the database.");
  }
}
