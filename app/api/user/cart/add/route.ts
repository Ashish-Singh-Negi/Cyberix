import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { uid, pid, brandName, productName, color, varient, img, isBuying } =
      await request.json();

    const user = await User.findOne({ _id: uid }).exec();

    const duplicateItem = user.itemsInCart.filter(
      (product: CartItemProps) => product.pid === pid && product.color === color
    );

    if (duplicateItem.length) {

      duplicateItem[0].isBuying = isBuying;
      await user.save();
    }

    if (duplicateItem.length) {
      return NextResponse.json({
        success: true, //
        message: `${productName} already exist in Cart`,
      });
    }

    await User.findByIdAndUpdate(uid, {
      $push: {
        itemsInCart: {
          pid,
          color,
          brandName,
          productName,
          varient,
          quantity: 1,
          img,
          isBuying,
        },
      },
    });

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
  }
}
