import { db } from "@/lib/mongodb";

export async function GET() {
  const result = await db.collection("users").find().toArray();
  if (!result) return new Response("Internal server error", { status: 500 });
  return Response.json(result);
}
