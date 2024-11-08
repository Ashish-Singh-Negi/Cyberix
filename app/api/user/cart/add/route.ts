import { connectToDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { uid, pid, brandName, productName, color, varient, img, isBuying } =
      await request.json();

    // Search for user
    const user = await User.findOne({ _id: uid }).exec();

    // check if already added
    const isExist = user.itemsInCart.filter(
      (product: CartItemProps) =>
        product.pid === pid &&
        product.color === color &&
        product.varient._id === varient._id
    );

    user.itemsInCart.forEach((product: CartItemProps) => {
      if (
        product.pid !== pid ||
        product.color !== color ||
        product.varient._id !== varient._id
      ) {
        product.isBuying = false;
      }
    });

    if (isExist.length) {
      isExist[0].isBuying = isBuying;
      await user.save();

      return NextResponse.json({
        success: true,
        message: `${productName} already exist in Cart`,
      });
    }

    await user.itemsInCart.push({
      pid,
      color,
      brandName,
      productName,
      varient,
      quantity: 1,
      img,
      isBuying,
    });

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Product Added In Cart",
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
  } finally {
    await disconnectToDB();
  }
}
