import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGO_URI not found");

    await mongoose.connect(uri);

    console.info("[database] Connected");
  } catch (error) {
    console.error("[database] Connection failed", error);
    throw error;
  }
}
