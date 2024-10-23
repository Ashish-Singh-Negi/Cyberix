import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.DATABASE_URL}`)
      .then(() => console.log("connected to DB"));
  } catch (error) {
    console.log("Not Connected Due to error" + error);
  }
};
