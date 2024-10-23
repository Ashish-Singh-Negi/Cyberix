import { connectToDB } from "@/lib/connectToDB";
import { NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";

export async function POST() {
  try {
    await connectToDB();
    
    const response = NextResponse.json(
      {
        message: "Signout Successfully",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  } finally {
    disconnectToDB();
  }
}
