import mongoose, { Schema, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    heading: {
      type: String,
      require: true,
    },
    review: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      require: true,
    },
    dislikes: {
      type: [String],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const VarientSchema = new Schema({
  memory: String,
  storage: String,
  mrp: String,
  salePrice: String,
  inStock: [
    {
      color: String,
      stock: Number,
    },
  ],
});

const MobileSchema = new Schema(
  {
    adminID: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    brandName: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    defaultImgs: {
      type: [String],
      require: true,
    },
    color: {
      type: Array,
      require: true,
    },
    rams: {
      type: [String],
      require: true,
    },
    storages: {
      type: [String],
      require: true,
    },
    varients: {
      type: [VarientSchema],
      require: true,
    },
    highlights: {
      type: [String],
      require: true,
    },
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    reviews: {
      type: [ReviewSchema],
      require: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Mobile =
  models.Mobile || mongoose.model("Mobile", MobileSchema, "mobiles");

export default Mobile;
