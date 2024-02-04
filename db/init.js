import mongoose from "mongoose"

export default async function initDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error)
    process.exit(1)
  }
}
