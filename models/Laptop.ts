import mongoose, { Schema, models } from "mongoose";

const LaptopSchema = new Schema(
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
      type: Array<String>,
      require: true,
    },
    display: {
      type: String,
      require: true,
    },
    color: {
      type: Array,
      require: true,
    },
    rams: {
      type: Array<String>,
      require: true,
    },
    storages: {
      type: Array<String>,
      require: true,
    },
    processors: {
      type: Array<String>,
      require: true,
    },
    gpus: {
      type: Array<String>,
      require: true,
    },
    varients: {
      type: Array,
      require: true,
    },
    highlights: {
      type: Array,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    reviews: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Laptop =
  models.Laptop || mongoose.model("Laptop", LaptopSchema, "laptops");

export default Laptop;
