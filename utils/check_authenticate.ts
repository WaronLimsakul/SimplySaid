import { db } from "@/lib/mongodb";
import { Collection } from "mongodb";
import { NextRequest } from "next/server";

const sessions_coll: Collection = db.collection("sessions");

// get user id from session id from cookies
// if not, return Response.
export default async function authorize_session(
    req: NextRequest,
): Promise<Response | string> {
    const _parsed: Map<string, { name: string; value: string }> =
        req.cookies["_parsed"];
    if (_parsed.size === 0)
        return new Response("User not logged in", { status: 401 });

    const session_token_obj = _parsed.get("authjs.session-token");
    if (!session_token_obj)
        return new Response("Error, no session token found", { status: 500 });

    const sess_token: string = session_token_obj.value;

    const user_id = await sessions_coll.findOne(
        { sessionToken: sess_token },
        { projection: { userId: 1 } },
    );

    if (!user_id) return new Response("Session not valid", { status: 400 });
    return user_id["userId"];
}
