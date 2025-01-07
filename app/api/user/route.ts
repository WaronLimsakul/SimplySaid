import { db } from "@/lib/mongodb";
import { NextRequest } from "next/server";

// For search by name only.
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name");

  if (!name) return new Response("No name provided", { status: 400 });

  const result = await db
    .collection("users")
    .findOne({ name }, { projection: { _id: 1 } });
  if (!result) return new Response("Internal server error", { status: 500 });

  return Response.json(result);
}
