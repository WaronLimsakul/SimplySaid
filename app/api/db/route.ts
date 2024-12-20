import { db } from "@/lib/mongodb";

const users = db.collection("users");

export async function GET() {
    // .find() will return only cursor. We need to use .toArray() + await to fetch array.
    const allUsers = await users.find().toArray();
    return Response.json(allUsers);
}
