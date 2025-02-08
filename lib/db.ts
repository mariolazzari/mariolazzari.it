import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? "";
if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable in your .env.local file"
  );
}

/**
 * Mongoose Connection Cache
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI)
      .then(mongooseInstance => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongo;
