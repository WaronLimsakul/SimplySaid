import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) throw new Error("No connection string");
const uri: string = process.env.MONGO_URI;
const clientOptions: mongoose.ConnectOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};
// need to find a way to always connect with out spam connecting.
const connectDB = async () => {
  try {
    const result = await mongoose.connect(uri, clientOptions);
    console.log("successfully connect to db");
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
};

// still don't fully understand how it works.
const createPostSchema = async () => {
  try {
    const postSchema = new mongoose.Schema({
      title: { type: String, required: true },
      content: { type: String, required: true },
      votes: { type: Number, default: 0 },
    });
    const post_model =
      mongoose.models.post || mongoose.model("post", postSchema);
    return post_model;
  } catch (err) {
    console.error(err);
  }
};
export { connectDB, createPostSchema };
