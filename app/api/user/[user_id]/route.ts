import { db } from "@/lib/mongodb";
import authorize_session from "@/utils/backend/check_authenticate";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

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
// We use this route to edit user profile.
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ user_id: string }> },
) {
    const user_id: string = (await params).user_id;

    const authorized_result = await authorize_session(req);
    if (authorized_result instanceof Response) return authorized_result;

    const userId = authorized_result;
    // user_id is from params, check if it's the session owner.
    if (userId != user_id)
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
