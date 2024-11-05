import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connectToDB();

    const { uid, pid, brandName, productName, color, varient, img, isBuying } =
      await request.json();

    const user = await User.findOne({ _id: uid }).exec();

    // const duplicateItem = user.itemsInCart.filter(
    //   (product: CartItemProps) => product.pid === pid && product.color === color
    // );

    // duplicateItem[0].isBuying = isBuying;

    user.itemsInCart.map((product: CartItemProps) => {
      product.isBuying = isBuying;
    });

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Cart item updated",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
