import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in .env.local");
}

// Use a global cache to prevent multiple connections in development
let isConnected = false;

export async function connectMongo() {
  try {
    if (isConnected) {
      return;
    }

    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.info("MongoDB Connected");
  } catch (error) {
    isConnected = false;
    console.error("MongoDB connection error", error);
  }
}
