import { connectDB, createPostSchema } from "@/lib/mongoosedb";

export async function GET() {
  const connect = await connectDB();
  return Response.json(connect);
}
export async function POST() {
  const result = await createPostSchema();
  console.log(result);
  return Response.json({ message: "ok" });
}
