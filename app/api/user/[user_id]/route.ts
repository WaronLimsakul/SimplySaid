import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { useId } from "react";

const users_coll = db.collection("users");

// have to pass in req: Request before params to actually access params.
export async function GET(
    req: Request,
    {
        params,
    }: {
        params: Promise<{ user_id: string }>;
    },
) {
    const user_id = (await params).user_id;
    // can't pass string directly, need to change to ObjectId
    const result = await users_coll.findOne({ _id: new ObjectId(user_id) });

    if (!result) return new Response("User not found", { status: 404 });

    return Response.json(result);
}

// only PUT if the request come from the account owner.
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ user_id: string }> },
) {
    const user_id: string = (await params).user_id;

    const _parsed: Map<string, { name: string; value: string }> =
        req.cookies["_parsed"];
    if (_parsed.size === 0)
        return new Response("User not logged in", { status: 401 });

    const session_token_obj = _parsed.get("authjs.session-token");
    if (!session_token_obj)
        return new Response("Error, no session token found", { status: 500 });

    const sess_token: string = session_token_obj.value;

    const session_owner = await users_coll.findOne(
        { sessionToken: sess_token },
        { projection: { userId: 1 } },
    );
    // user_id is from params, check if it's the session owner.
    if (!session_owner || session_owner.userId != user_id)
        return new Response("No user found or user is not owner of the account", {
            status: 401,
        });

    // If the request is in json text -> parse to json.
    // I don't want to parse body anymore, so I'll just use only use json body.
    const body: JSON = await req.json();

    // validate body field
    for (const field in body)
        if (!(field == "name" || field == "email"))
            return new Response("Bad request", { status: 400 });

    // for put in driver.
    const updated_doc = { $set: body };

    const result = await users_coll.updateOne(
        { _id: new ObjectId(user_id) },
        updated_doc,
    );
    console.log(result);
    return Response.json(result);
}
