import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);

    console.log(`Successfully connected to DB`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database.");
  }
};
