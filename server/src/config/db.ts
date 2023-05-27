import mongoose from "mongoose";

const dbConnectionString = process.env.DB_CONNECTION_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(dbConnectionString as string);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
};

export { connectDB };
