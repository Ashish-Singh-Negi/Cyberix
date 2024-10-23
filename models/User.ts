import mongoose, { Schema, models } from "mongoose";

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
  address: Object,
  orders: Array,
  itemsInCart: Array,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = models.User || mongoose.model("User", UserSchema, "Users");

export default User;
