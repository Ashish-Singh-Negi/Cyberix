import mongoose, { Schema, models } from "mongoose";

const Items = new Schema({
  pid: String,
  category: String,
  brandName: String,
  productName: String,
  color: String,
  quantity: Number,
  varient: Object,
  img: String,
  isBuying: Boolean,
});

const UserSchema = new Schema({
  username: {
    type: String,
    require: [true, "please enter a username"],
  },
  email: {
    type: String,
    require: [true, "please enter an email"],
  },
  password: {
    type: String,
    require: [true, "please enter a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: Object,
    default: null,
  },
  orders: Array,
  itemsInCart: [Items],
  itemsToBuy: [Items],
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = models.User || mongoose.model("User", UserSchema, "Users");

export default User;
