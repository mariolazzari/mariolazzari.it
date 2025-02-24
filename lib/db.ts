import mongoose from "mongoose";

// mongodb connection settings
const MONGO_URI: string = process.env.MONGO_URI ?? "";
if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable in .env.local"
  );
}

export const connectMongo = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
    console.info("Connected to MongoDB:", MONGO_URI);
  } catch (ex) {
    console.error("Error connecting to MongoDB", ex);
    throw ex;
  }
};
