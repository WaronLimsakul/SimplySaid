import { db } from "@/lib/mongodb";

const users = db.collection("users");

export async function GET() {
    // .find() will return only cursor. We need to use .toArray() + await to fetch array.
    // .findOne() is a promise, we just cast await to this one is enough.
    const allUsers = await users.find().toArray();
    return Response.json(allUsers);
}
